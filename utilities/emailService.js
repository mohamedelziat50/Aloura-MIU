import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/secrets.js";

export default async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject,
      text,  // This will be the plain text version of the email (fallback)
      html,  // This will be the HTML version of the email
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
