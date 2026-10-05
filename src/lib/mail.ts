import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

function getTransporter(): ReturnType<typeof nodemailer.createTransport> {
  if (!transporter) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable");
    }
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}

export async function sendMail(options: { subject: string; text: string; replyTo?: string }): Promise<void> {
  const user = process.env.GMAIL_USER;
  if (!user) throw new Error("Missing GMAIL_USER environment variable");

  await getTransporter().sendMail({
    from: user,
    to: user,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
