import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { configDotenv } from "dotenv";

configDotenv();

export const mailtrapTransport = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN,
  })
);

export const sender = {
  address: "auth@surajrasaili.com.np",
  name: "MERN AUTH",
};

// transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
