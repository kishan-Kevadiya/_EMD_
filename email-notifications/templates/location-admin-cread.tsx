import * as React from 'react';

interface LocationAdminCredentialsEmailProps {
  name: string;
  email: string;
  password: string;
  loginUrl: string;
}

export default function LocationAdminCredentialsEmail({
  name,
  email,
  password,
  loginUrl,
}: LocationAdminCredentialsEmailProps) {
  return (
    <html>
    <head>
      <style>{`
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f7fc;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f2f8fc;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }
        .header {
          background-color: #5c6bc0;
          color: #fff;
          padding: 40px;
          text-align: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .header h1 {
          margin: 0;
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .content {
          padding: 30px;
          font-size: 16px;
          color: #333;
        }
        .content p {
          margin-bottom: 20px;
          line-height: 1.8;
        }
        .content a {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          background-color: #5c6bc0;
          padding: 15px 25px;
          border-radius: 30px;
          font-size: 18px;
          transition: background-color 0.3s ease;
        }
        .content a:hover {
          background-color: #3f4fa5;
          text-decoration: none;
        }
        .cta-button {
          display: inline-block;
          background-color: #5c6bc0;
          color: #fff;
          padding: 15px 30px;
          border-radius: 30px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          font-size: 18px;
          margin-top: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .cta-button:hover {
          background-color: #3f4fa5;
        }
        .highlight-box {
          background-color: #ffffff;
          padding: 20px;
          margin-top: 20px;
          border-radius: 8px;
          border: 1px solid #c1d3f2;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          font-size: 16px;
        }
        .highlight-box p {
          margin: 0;
          padding: 8px 0;
          font-size: 16px;
          color: #333;
        }
        .footer {
          background-color: #f4f4f4;
          color: #777;
          text-align: center;
          padding: 15px;
          font-size: 14px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .footer p {
          margin: 0;
        }
        @media screen and (max-width: 600px) {
          .container {
            padding: 10px;
          }
          .header h1 {
            font-size: 28px;
          }
          .content a, .cta-button {
            font-size: 16px;
            padding: 12px 20px;
          }
        }`}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>Your Location Admin Account Credential 🔒</h1>
        </div>
        <div className="content">
          <p>Dear {name},</p>
          <p>We're excited to have you on board! Your Location Admin account has been successfully created. Here are your login credentials:</p>
          
          <div className="highlight-box">
            <p><strong>Email:</strong> <span>{email}</span></p>
            <p><strong>Password:</strong> <span>{password}</span></p>
          </div>
  
          <p>To get started, please click the button below to log in:</p>
          <a href={loginUrl} className="cta-button">Login Now</a>
  
          <p>If you have any questions or need assistance, feel free to contact our support team. We're here to help!</p>
          <p>Best regards,</p>
          <p><strong>Teams.</strong></p>
        </div>
        <div className="footer">
          <p>&copy; 2024 Teams. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html> 
  );
}

