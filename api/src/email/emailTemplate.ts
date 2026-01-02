export const FORGOT_PASSWORD_Template = (resetLink: string) => `
 <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              color: #333;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #ddd;
              border-radius: 8px;
          }
          .email-header {
              text-align: center;
              margin-bottom: 20px;
          }
          .email-header h2 {
              color: #4CAF50;
              margin-bottom: 10px;
          }
          .email-body p {
              color: #444;
          }
          .email-button {
              text-align: center;
              margin: 20px 0;
          }
          .email-button a {
              display: inline-block;
              padding: 12px 20px;
              font-size: 16px;
              color: #fff;
              background-color: #4CAF50;
              text-decoration: none;
              border-radius: 5px;
          }
          .email-footer {
              text-align: center;
              font-size: 12px;
              color: #aaa;
          }
          .email-footer a {
              color: #4CAF50;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h2>Password Reset Request</h2>
              <p>We're here to help you reset your password securely.</p>
          </div>
          <div class="email-body">
              <p>Hello,</p>
              <p>
                  We received a request to reset your password. To proceed, please click the button below. This link will expire in <strong>30 minutes</strong>.
              </p>
          </div>
          <div class="email-button">
              <a href="${resetLink}" target="_blank">
                  Reset Your Password
              </a>
          </div>
          <div class="email-body">
              <p>If you did not request this, you can safely ignore this email.</p>
              <p>Thank you,<br><strong>Invoice Horizon</strong></p>
          </div>
          <hr>
          <div class="email-footer">
              <p>
                  If you are having trouble clicking the button, copy and paste the link below into your browser:<br>
                  <a href="${resetLink}" class="button">Reset Password</a>
              </p>
          </div>
      </div>
  </body>
  </html>
`;

export const RESEND_OTP_Template = ( otp: number, expiryMinutes = 10 ) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Resend OTP</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 480px;
    margin: 40px auto;
    background: #ffffff;
    padding: 35px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 8px 26px rgba(0,0,0,0.1);
  }

  .header {
    font-size: 26px;
    font-weight: bold;
    background: linear-gradient(135deg, #ff8c42, #ff6a00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }

  .message {
    font-size: 16px;
    color: #333;
    line-height: 1.6;
  }

  .otp-box {
    margin: 25px 0;
    padding: 15px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 6px;
    background: #fff3e8;
    border: 2px dashed #ff8c42;
    border-radius: 10px;
    color: #ff6a00;
  }

  .note {
    font-size: 14px;
    color: #555;
    margin-top: 15px;
  }

  .footer {
    margin-top: 35px;
    font-size: 12px;
    color: #888;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">Your New OTP</div>

    <p class="message">
      Hello,<br />
      As requested, here is your new One-Time Password (OTP) for verification.
    </p>

    <div class="otp-box">${otp}</div>

    <p class="note">
      This OTP will expire in <strong>${expiryMinutes} minutes</strong>.
      Please do not share this code with anyone.
    </p>

    <div class="footer">
      &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const VERIFY_EMAIL_Template = (otp: number) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #4CAF50;
              background: #e8f5e9;
              border: 1px dashed #4CAF50;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
              <span class="verification-code">${otp}</span>
              <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Invoice Horizon. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>

`;