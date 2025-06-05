export const generateVerificationEmail = (name, userId) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aloura Welcome Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      font-family: 'Playfair Display', serif;
      background-color: #f1f5f0;
      color: #111;
    }

    .email-wrapper {
      background-color: #f8f1ea;
      text-align: center;
      padding: 40px 20px;
      max-width: 600px;
      margin: auto;
    }

    .logo {
      max-width: 150px;
      margin-bottom: 30px;
    }

    h1 {
      font-size: 28px;
      font-weight: 900;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      max-width: 500px;
      margin: 0 auto 30px;
    }

    .verify-btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #000;
      color: #ffffff !important;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .socials {
      text-align: center;
    }

    .socials a {
      display: inline-block;
      margin: 0 10px;
    }

    .socials img {
      width: 32px;
      height: 32px;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <img src="https://yourdomain.com/img/ALOURA.jpg" alt="Aloura Logo" class="logo" />

    <h1>Your Journey With Aloura <br />Begins Here!</h1>

    <p>
      This helps us keep your account secure and ensures you don’t miss out on
      exclusive offers, personalized recommendations, and more..
    </p>

    <a href="http://localhost:3000/api/auth/verify/${userId}" class="verify-btn">Verify Your Account</a>

    <div class="socials">
      <a href="https://www.tiktok.com/@youraccount">
        <img src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png" alt="TikTok" />
      </a>
      <a href="https://instagram.com/youraccount">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
      </a>
    </div>
  </div>
</body>
</html>
  `;
};

export const generatePasswordResetEmail = (name, resetCode) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aloura Password Reset</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      font-family: 'Playfair Display', serif;
      background-color: #f1f5f0;
      color: #111;
    }

    .email-wrapper {
      background-color: #f8f1ea;
      text-align: center;
      padding: 40px 20px;
      max-width: 600px;
      margin: auto;
    }

    .logo {
      max-width: 150px;
      margin-bottom: 30px;
    }

    h1 {
      font-size: 28px;
      font-weight: 900;
      margin-bottom: 10px;
      color: #111;
    }

    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #333;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      max-width: 500px;
      margin: 0 auto 30px;
    }

    .reset-code-container {
      background-color: #fff;
      border: 2px dashed #ccc;
      border-radius: 12px;
      padding: 30px 20px;
      margin: 30px auto;
      max-width: 300px;
    }

    .reset-code-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .reset-code {
      font-size: 36px;
      font-weight: 900;
      color: #000;
      letter-spacing: 8px;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
    }

    .expiry-notice {
      font-size: 14px;
      color: #666;
      margin-top: 15px;
      font-style: italic;
    }

    .warning-text {
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      padding: 15px;
      margin: 20px auto;
      max-width: 450px;
      font-size: 14px;
      color: #856404;
    }

    .security-tips {
      background-color: #e8f4fd;
      border-radius: 8px;
      padding: 20px;
      margin: 30px auto;
      max-width: 450px;
      text-align: left;
    }

    .security-tips h3 {
      font-size: 16px;
      margin-bottom: 10px;
      color: #0c5460;
    }

    .security-tips ul {
      font-size: 14px;
      color: #0c5460;
      margin: 0;
      padding-left: 20px;
    }

    .security-tips li {
      margin-bottom: 5px;
    }

    .socials {
      text-align: center;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #ddd;
    }

    .socials a {
      display: inline-block;
      margin: 0 10px;
    }

    .socials img {
      width: 32px;
      height: 32px;
    }

    .footer-text {
      font-size: 12px;
      color: #888;
      margin-top: 20px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <img src="https://yourdomain.com/img/ALOURA.jpg" alt="Aloura Logo" class="logo" />

    <h1>Password Reset Request</h1>
    
    ${name ? `<p class="greeting">Hello ${name},</p>` : ''}

    <p>
      We received a request to reset your password for your Aloura account. 
      Use the verification code below to proceed with resetting your password.
    </p>

    <div class="reset-code-container">
      <div class="reset-code-label">Your Reset Code</div>
      <div class="reset-code">${resetCode}</div>
      <div class="expiry-notice">This code expires in 10 minutes</div>
    </div>

    <div class="warning-text">
      <strong>⚠️ Important:</strong> If you didn't request this password reset, please ignore this email. 
      Your account remains secure and no changes have been made.
    </div>
    <p>
      If you're having trouble or didn't request this reset, please contact our 
      support team immediately.
    </p>

    <div class="socials">
      <a href="https://www.tiktok.com/@youraccount">
        <img src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png" alt="TikTok" />
      </a>
      <a href="https://instagram.com/youraccount">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
      </a>
    </div>

    <div class="footer-text">
      This email was sent to you because a password reset was requested for your Aloura account.<br>
      © 2024 Aloura. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
};