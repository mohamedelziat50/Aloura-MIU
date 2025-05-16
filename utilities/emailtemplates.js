export const generateVerificationEmail = (name, userId) => {
  return `
    <html>
      <body>
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify/${userId}" 
           style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Verify Your Email
        </a>
        <p>If you did not sign up, please ignore this email.</p>
        <p>Best regards,<br/>The Team</p>
      </body>
    </html>
  `;
};
