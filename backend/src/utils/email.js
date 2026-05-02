const nodemailer = require("nodemailer");
const logger = require("../config/logger");

function appPublicUrl() {
  const raw =
    process.env.FRONTEND_PUBLIC_URL ||
    process.env.PUBLIC_APP_URL ||
    process.env.APP_PUBLIC_URL ||
    "http://localhost:3000";
  return String(raw).replace(/\/$/, "");
}

function createTransport() {
  if (process.env.SMTP_URL && String(process.env.SMTP_URL).trim()) {
    try {
      return nodemailer.createTransport(process.env.SMTP_URL);
    } catch (e) {
      logger.error("Invalid SMTP_URL", { message: e?.message });
      return null;
    }
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
}

function fromAddress() {
  return (
    process.env.MAIL_FROM ||
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    '"SevaSetu" <noreply@localhost>'
  );
}

async function sendMail({ to, subject, text, html }) {
  const transport = createTransport();
  if (!transport) {
    return { sent: false, reason: "smtp_not_configured" };
  }

  try {
    await transport.sendMail({
      from: fromAddress(),
      to,
      subject,
      text,
      html
    });
    return { sent: true };
  } catch (err) {
    logger.error("Outbound email failed", { message: err?.message });
    return { sent: false, reason: err?.message || "send_failed" };
  }
}

function isConfigured() {
  return Boolean(createTransport());
}

async function sendVerificationEmail(toAddress, token) {
  const base = appPublicUrl();
  const link = `${base}/verify-email?email=${encodeURIComponent(toAddress)}&token=${encodeURIComponent(token)}`;
  const subject = "Verify your SevaSetu account";
  const text = `Verify your email by opening:\n${link}\n\nIf you did not sign up, ignore this message.`;
  const html = `
    <p>Welcome to SevaSetu.</p>
    <p><a href="${link}">Verify your email address</a></p>
    <p style="color:#64748b;font-size:12px;">If the button does not work, paste this URL into your browser:<br/><span style="word-break:break-all;">${link}</span></p>
  `;
  const result = await sendMail({ to: toAddress, subject, text, html });
  return result.sent;
}

async function sendPasswordResetEmail(toAddress, token) {
  const base = appPublicUrl();
  const link = `${base}/reset-password?email=${encodeURIComponent(toAddress)}&token=${encodeURIComponent(token)}`;
  const subject = "Reset your SevaSetu password";
  const text = `Reset your password using:\n${link}\n\nThis link expires in one hour. If you did not request a reset, ignore this email.`;
  const html = `
    <p>You requested a password reset.</p>
    <p><a href="${link}">Choose a new password</a></p>
    <p style="color:#64748b;font-size:12px;">Link expires in one hour.</p>
  `;
  const result = await sendMail({ to: toAddress, subject, text, html });
  return result.sent;
}

module.exports = {
  appPublicUrl,
  isConfigured,
  sendMail,
  sendVerificationEmail,
  sendPasswordResetEmail
};
