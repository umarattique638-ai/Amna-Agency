import nodemailer, { type Transporter } from "nodemailer";
import { env, isProd } from "../config/env.js";

let transporter: Transporter | null = null;
function getTransporter() {
  if (!env.SMTP_HOST) return null;
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  return transporter;
}

const layout = (title: string, body: string, cta: { label: string; url: string }) => `
<!doctype html><html><body style="margin:0;background:#f7f8fa;font-family:Arial,sans-serif;color:#1c1f30">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
    <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;padding:36px;border:1px solid #eaebef">
      <tr><td style="font-size:22px;font-weight:800">Axiom<span style="color:#f05123">.</span></td></tr>
      <tr><td style="padding-top:24px;font-size:20px;font-weight:700">${title}</td></tr>
      <tr><td style="padding-top:12px;font-size:15px;line-height:1.6;color:#646a7b">${body}</td></tr>
      <tr><td style="padding-top:28px"><a href="${cta.url}" style="background:#f05123;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;display:inline-block">${cta.label}</a></td></tr>
      <tr><td style="padding-top:24px;font-size:12px;color:#9a9fae">If the button doesn't work, paste this link into your browser:<br>${cta.url}</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

export const mailService = {
  /** Sends the email, or logs the link when SMTP isn't configured (local development). */
  async sendVerificationEmail(to: string, name: string, url: string) {
    const t = getTransporter();
    if (!t) {
      if (isProd) console.error("[mail] SMTP is not configured — verification email NOT sent to", to);
      console.info(`\n📧 Verify ${to}: ${url}\n`);
      return;
    }
    await t.sendMail({
      from: env.MAIL_FROM,
      to,
      subject: "Confirm your email — Axiom dashboard",
      text: `Hi ${name}, confirm your email to activate your account: ${url}`,
      html: layout(
        `Hi ${name}, confirm your email`,
        `Thanks for signing up. Click the button below to verify your email address. This link expires in ${env.EMAIL_VERIFY_TTL_HOURS} hours.`,
        { label: "Verify my email", url },
      ),
    });
  },
};
