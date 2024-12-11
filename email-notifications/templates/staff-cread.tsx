import * as React from 'react';

interface StaffCredentialsEmailProps {
  email: string;
  password: string;
  loginUrl: string;
}

export default function StaffCredentialsEmail({ email, password, loginUrl }: StaffCredentialsEmailProps) {
  return (
    <html>
      <body style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: '#333' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ color: '#4a4a4a' }}>Welcome Event Staff Member!</h1>
          <p>Your event staff account has been created. Here are your login credentials:</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Password:</strong> {password}</p>
          <p>Please login at: <a href={loginUrl}>{loginUrl}</a></p>
          <p>We recommend changing your password after your first login.</p>
          <p>If you have any questions, please contact the event organizer.</p>
        </div>
      </body>
    </html>
  );
}

