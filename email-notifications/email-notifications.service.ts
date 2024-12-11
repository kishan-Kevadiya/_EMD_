import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import LocationAdminCredentialsEmail from './templates/location-admin-cread';
import HostCredentialsEmail from './templates/host-cread';
import StaffCredentialsEmail from './templates/staff-cread';

interface EmailInfo {
  to: string;
  subject: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: parseInt(process.env.SMTP_PORT as string, 10) || 465,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: process.env.SMTP_SECURE === 'true',
});

export default class EmailNotificationService {
  private async sendEmail(mail: EmailInfo, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: mail.to,
      subject: mail.subject,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  public async sendLocationAdminCredentials(
    email: string,
    name: string,
    password: string,
    loginUrl: string,
  ): Promise<void> {
    if (!email || !name || !password) {
      console.error('Missing required parameters for sending location admin credentials');
      throw new Error('Invalid parameters for sending email');
    }

    if (!loginUrl) {
      console.error('LOCATION_ADMIN_LOGIN_URL is not set in environment variables');
      throw new Error('Missing login URL configuration');
    }

    const emailContent = LocationAdminCredentialsEmail({
      name,
      email,
      password,
      loginUrl,
    });

    try {
      const html = await render(emailContent);

      if (typeof html !== 'string') {
        console.error('Rendered email content is not a string');
        throw new Error('Invalid email content');
      }

      await this.sendEmail(
        {
          to: email,
          subject: 'Your Location Admin Account Credentials',
        },
        html
      );
    } catch (error) {
      console.error('Error rendering or sending email:', error);
      throw new Error('Failed to render or send email');
    }
  }

  public async sendHostCredentials(
    email: string,
    password: string,
    eventId: string,
    locationId: string
  ): Promise<void> {
    if (!email || !password || !eventId || !locationId) {
      console.error('Missing required parameters for sending host credentials');
      throw new Error('Invalid parameters for sending email');
    }

    const loginUrl = `${process.env.APP_DOMAIN}/en/location/${locationId}/event/${eventId}/login`;

    const emailContent = HostCredentialsEmail({
      email,
      password,
      loginUrl,
    });

    try {
      const html = await render(emailContent);

      if (typeof html !== 'string') {
        console.error('Rendered email content is not a string');
        throw new Error('Invalid email content');
      }

      await this.sendEmail(
        {
          to: email,
          subject: 'Your Event Host Account Credentials',
        },
        html
      );
    } catch (error) {
      console.error('Error rendering or sending host email:', error);
      throw new Error('Failed to render or send host email');
    }
  }

  public async sendStaffCredentials(
    email: string,
    password: string,
    eventId: string,
    locationId: string,
  ): Promise<void> {
    if (!email || !password || !eventId || !locationId) {
      console.error('Missing required parameters for sending staff credentials');
      throw new Error('Invalid parameters for sending email');
    }

    const loginUrl = `${process.env.APP_DOMAIN}/en/location/${locationId}/event/${eventId}/st/login`;

    const emailContent = StaffCredentialsEmail({
      email,
      password,
      loginUrl,
    });

    try {
      const html = await render(emailContent);

      if (typeof html !== 'string') {
        console.error('Rendered email content is not a string');
        throw new Error('Invalid email content');
      }

      await this.sendEmail(
        {
          to: email,
          subject: 'Your Event Staff Account Credentials',
        },
        html
      );
    } catch (error) {
      console.error('Error rendering or sending staff email:', error);
      throw new Error('Failed to render or send staff email');
    }
  }
}

