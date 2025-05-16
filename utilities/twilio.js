// smsSender.js
import twilio from "twilio";
import { ACCOUNTSID, AUTHTOKEN, FRONUMBER } from "../config/secrets.js";

const accountSid = ACCOUNTSID;
const authToken = AUTHTOKEN;
const fromNumber = FRONUMBER;

const client = twilio(accountSid, authToken);


export default async function sendSMStwilio(to, message) {
  try {
    const res = await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    });
    console.log("✅ SMS sent:", res.sid);
  } catch (err) {
    console.error("❌ Failed to send SMS:", err.message);
  }
}


   // const normalizedPhone = phone.startsWith('+') ? phone : `+20${phone}`; add this so the phone number starts with 20 then the phone number
   //https://console.twilio.com/ --> the website link 