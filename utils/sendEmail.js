import nodemailer from "nodemailer";
// import { google } from "googleapis";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  return info;
};

export default sendEmail;

// These id's and secrets should come from .env file.
// const CLIENT_ID = 'YOUR CLIENT ID';
// const CLEINT_SECRET = 'YOUR CLIENT SECRET';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = 'YOUR REFRESH TOKEN';

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLEINT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'yours authorised email address',
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: 'SENDER NAME <yours authorised email address@gmail.com>',
//       to: 'to email address here',
//       subject: 'Hello from gmail using API',
//       text: 'Hello from gmail email using API',
//       html: '<h1>Hello from gmail email using API</h1>',
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }
