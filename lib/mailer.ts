import nodemailer from 'nodemailer';

const port = Number(process.env.SMTP_PORT) || 465;

// Singleton transporter — created once at module load, reused for every send.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  // Port 465 → implicit TLS (secure: true).  587/25 → STARTTLS (secure: false).
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Fail fast — don't let a blocked port hang the request for 30 s.
  connectionTimeout: 10_000,
  greetingTimeout:   10_000,
  socketTimeout:     10_000,
});

export default transporter;
