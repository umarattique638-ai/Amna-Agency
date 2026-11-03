import nodemailer, { type Transporter } from "nodemailer";
import { allowedOrigins, env, isProd } from "../config/env.js";
import type { LeadDTO } from "../dto/index.js";

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
      <tr><td style="font-size:22px;font-weight:800">Axiom<span style="color:#2b7cff">Digital</span></td></tr>
      <tr><td style="padding-top:24px;font-size:20px;font-weight:700">${title}</td></tr>
      <tr><td style="padding-top:12px;font-size:15px;line-height:1.6;color:#646a7b">${body}</td></tr>
      <tr><td style="padding-top:28px"><a href="${cta.url}" style="background:#1b6fff;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;display:inline-block">${cta.label}</a></td></tr>
      <tr><td style="padding-top:24px;font-size:12px;color:#9a9fae">If the button doesn't work, paste this link into your browser:<br>${cta.url}</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

/** Escape user-supplied text before it goes into an HTML email. */
const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const notifyList = () =>
  env.LEAD_NOTIFY_EMAILS.split(",").map((s) => s.trim()).filter(Boolean);

export const mailService = {
  /** Instant alert to the admins for every new contact-form enquiry. Never throws. */
  async sendLeadNotification(lead: LeadDTO) {
    const to = notifyList();
    if (!to.length) return;
    const t = getTransporter();
    if (!t) {
      console.warn("[mail] SMTP is not configured — lead alert NOT sent for", lead.email);
      return;
    }
    const site = allowedOrigins[0] ?? "";
    const dashboard = `${site}/dashboard/leads`;
    const digits = lead.phone.replace(/[^\d]/g, "");
    const rows: [string, string][] = [
      ["Name", esc(lead.name)],
      ["Email", `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>`],
      ["Phone / WhatsApp", lead.phone ? `${esc(lead.phone)} &nbsp;·&nbsp; <a href="https://wa.me/${digits}">WhatsApp</a>` : "—"],
      ["Company", lead.company ? esc(lead.company) : "—"],
      ["Services", lead.services.map(esc).join(", ") || "—"],
      ["Budget", lead.budget ? esc(lead.budget) : "—"],
      ["Received", lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " (PKT)" : "—"],
    ];
    const table = `<table cellpadding="0" cellspacing="0" width="100%" style="margin-top:8px;border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="padding:8px 0;width:140px;color:#9a9fae;font-size:13px;vertical-align:top">${k}</td><td style="padding:8px 0;color:#1c1f30;font-size:14px">${v}</td></tr>`)
      .join("")}</table>
      <p style="margin:18px 0 6px;color:#9a9fae;font-size:13px">Message</p>
      <div style="background:#f3f6ff;border-radius:12px;padding:14px 16px;color:#1c1f30;font-size:14px;white-space:pre-wrap">${esc(lead.message)}</div>`;

    try {
      await Promise.race([
        t.sendMail({
          from: env.MAIL_FROM,
          to,
          replyTo: lead.email, // hitting "Reply" answers the customer directly
          subject: `🔔 New enquiry: ${lead.name}${lead.services.length ? ` — ${lead.services.join(", ")}` : ""}`,
          text: [
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Phone / WhatsApp: ${lead.phone || "—"}`,
            `Company: ${lead.company || "—"}`,
            `Services: ${lead.services.join(", ") || "—"}`,
            `Budget: ${lead.budget || "—"}`,
          ].join("\n") + `\n\nMessage:\n${lead.message}\n\nDashboard: ${dashboard}`,
          html: layout("New enquiry from your website", table, { label: "Open in dashboard", url: dashboard }),
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("SMTP timeout")), 8000)),
      ]);
    } catch (e) {
      console.error("[mail] lead alert failed", e);
    }
  },

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
