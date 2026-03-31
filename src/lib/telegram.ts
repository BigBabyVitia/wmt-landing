const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8466039345:AAHCpV__2EsQhcpHDg_7QHqyqesDtHcvlg0";
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "411945352";

// Mapping internal form keys to human-readable labels
const LABEL_MAP: Record<string, string> = {
  name: "ФИО/Имя",
  email: "Email",
  phone: "Телефон",
  company: "Компания",
  role: "Роль",
  task: "Задача",
}

/**
 * Sends a message to the Telegram bot.
 * @param formData Key-value pairs of the form data.
 */
export async function sendTelegramMessage(formData: Record<string, string>) {
  if (CHAT_ID === "ВАШ_CHAT_ID" || !CHAT_ID) {
    console.error("Telegram CHAT_ID is not set. Please set VITE_TELEGRAM_CHAT_ID in your .env file.");
    throw new Error("Конфигурация Telegram не завершена. Проверьте CHAT_ID.");
  }

  // Format the message nicely for Telegram
  const messageRows = Object.entries(formData)
    .map(([key, value]) => {
      const label = LABEL_MAP[key] || key;
      return `*${label}:* ${value}`;
    });

  const messageText = `🚀 *Новая заявка с сайта WMT*\n\n${messageRows.join("\n")}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || "Ошибка отправки в Telegram");
    }

    return await response.json();
  } catch (error) {
    console.error("Telegram ارسال error:", error);
    throw error;
  }
}
