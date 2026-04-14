import { google } from 'googleapis';

// Fix literal \n sequences that arrive from .env files.
// e.g.  "-----BEGIN PRIVATE KEY-----\nMIIE..."  →  actual newlines.
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Singleton sheets client — initialized once, shared across all requests.
const sheets = google.sheets({ version: 'v4', auth });

export { sheets };
