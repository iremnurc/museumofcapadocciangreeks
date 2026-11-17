"use server";

export type FormState = { status: "idle" | "sent" | "error"; message?: string };

const topics = ["Planning a visit", "Group or school visit", "Academic enquiry", "Something else"];

/**
 * Sends the contact form. If RESEND_API_KEY and CONTACT_TO are set, the message is
 * emailed through Resend; otherwise it is only logged on the server (development).
 */
export async function sendMessage(_prev: FormState, data: FormData): Promise<FormState> {
  if (data.get("company")) return { status: "sent" }; // honeypot: bots fill hidden fields

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const topic = String(data.get("topic") ?? "");
  const message = String(data.get("message") ?? "").trim();

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message || !topics.includes(topic)) {
    return { status: "error", message: "Please fill in your name, a valid email and a message." };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.info("[contact] (not sent: RESEND_API_KEY/CONTACT_TO missing)", { name, email, topic });
    return { status: "sent" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Museum website <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `[Website] ${topic}: ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });
  return res.ok ? { status: "sent" } : { status: "error", message: "Sorry, the message could not be sent. Please email us instead." };
}
