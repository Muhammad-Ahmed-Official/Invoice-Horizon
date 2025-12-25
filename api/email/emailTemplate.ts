export const FORGOT_PASSWORD_Template = (resetLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      text-align: center;
    }
    .header {
      font-size: 24px; /* Larger font size */
      font-weight: 700; /* Bold text */
      color: #ffffff;
      background: linear-gradient(135deg, #ff8c42, #ff6a00); /* Gradient background */
      padding: 20px; /* Padding around the header */
      border-radius: 8px; /* Rounded corners */
      margin-bottom: 20px; /* Space below the title */
      letter-spacing: 1px; /* Slightly spaced letters for a cleaner look */
      text-transform: uppercase; /* Uppercase letters for a more formal look */
    }
    .message {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      margin-top: 30px;
      padding: 14px 32px;
      background: linear-gradient(135deg, #ff8c42, #ff6a00);
      color: #ffffff;
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: background 0.3s, transform 0.3s;
    }
    .button:hover {
      background: linear-gradient(135deg, #ff6a00, #ff8c42);
      transform: translateY(-2px); /* Slight hover effect */
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 40px;
    }
    .footer a {
      color: #ff6a00;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Reset Your Password</div>
    <p class="message">
      Hello,<br /><br />
      We received a request to reset the password for your account. If you didn't request this, please ignore this email.
    </p>
    <p class="message">
      Click the button below to reset your password. This link will expire in 30 minutes.
    </p>
    <a href="${resetLink}" class="button">Reset Password</a>
    <p class="footer">
      If you didn’t request this, you can safely ignore this email.<br />
      &copy; ${new Date().getFullYear()} E-Commerce Platform. All rights reserved.
    </p>
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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    /* Title/Header Styles */
    .header {
      font-size: 24px; /* Larger font size */
      font-weight: 700; /* Bold text */
      color: #ffffff;
      background: linear-gradient(135deg, #ff8c42, #ff6a00); /* Gradient background */
      padding: 20px 40px; /* Padding around the header */
      border-radius: 8px; /* Rounded corners */
      margin-bottom: 20px; /* Space below the title */
      letter-spacing: 1px; /* Slightly spaced letters for a cleaner look */
      text-transform: uppercase; /* Uppercase letters for a more formal look */
    }
    .message {
      font-size: 18px;
      color: #555;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .otp-box {
      margin: 20px 0;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 8px;
      color: #ff6a00;
      padding: 15px;
      background-color: #fff3e0;
      border: 2px solid #ff6a00;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Verify Your Email</div> <!-- Enhanced title with gradient and padding -->
    <p class="message">
      Thank you for registering with us.<br />
      Please use the OTP below to verify your email address and complete your registration process.
    </p>
    <div class="otp-box">199005</div>
    <p class="message">
      If you didn’t request this, please ignore this email.<br />
      &copy; ${new Date().getFullYear()} E-Commerce Platform. All rights reserved.
    </p>
  </div>
</body>
</html>

`;