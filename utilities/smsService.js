import { Vonage } from "@vonage/server-sdk";
import { APIKEY, APISECRET } from "../config/secrets.js";

const vonage = new Vonage({
  apiKey: APIKEY,
  apiSecret: APISECRET,
});

const from = "Alora Fragrances";
const text = "A text message sent using the Vonage SMS API";

export default async function sendSMS(to, message) {
  try {
    const response = await vonage.sms.send({ to, from, text: message });
    console.log("✅ Message sent successfully");
    console.log(response);
  } catch (err) {
    console.error("❌ There was an error sending the message:");
    console.error(err);
  }
}



   // const normalizedPhone = phone.startsWith('+') ? phone : `+20${phone}`; add this so the phone number starts with 20 then the phone number
   //https://dashboard.nexmo.com/ --> the website link 



