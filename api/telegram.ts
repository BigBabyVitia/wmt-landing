import type { VercelRequest, VercelResponse } from "@vercel/node";

// These env vars are server-only (no VITE_ prefix) — never exposed to the browser
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const LABEL_MAP: Record<string, string> = {
  name: "ФИО/Имя",
  email: "Email",
  phone: "Телефон",
  company: "Компания",
  role: "Роль",
  task: "Задача",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate server config
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in environment variables.");
    return res.status(500).json({ error: "Серверная конфигурация Telegram не завершена." });
  }

  try {
    const formData: Record<string, string> = req.body;

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ error: "Пустые данные формы." });
    }

    // Format the message nicely for Telegram
    const messageRows = Object.entries(formData).map(([key, value]) => {
      const label = LABEL_MAP[key] || key;
      return `*${label}:* ${value}`;
    });

    const messageText = `🚀 *Новая заявка с сайта WMT*\n\n${messageRows.join("\n")}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return res.status(502).json({ error: errorData.description || "Ошибка отправки в Telegram" });
    }

    const result = await response.json();
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error("Telegram handler error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера." });
  }
}
