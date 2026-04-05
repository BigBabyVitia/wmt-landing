/**
 * Sends form data to the server-side API route,
 * which securely forwards it to Telegram.
 * The bot token never leaves the server.
 */
export async function sendTelegramMessage(formData: Record<string, string>) {
  const response = await fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as { error?: string }).error || "Ошибка отправки заявки"
    );
  }

  return response.json();
}
