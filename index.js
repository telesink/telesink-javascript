const VERSION = "1.0.1";

const endpoint = () => {
  if (typeof process !== "undefined") return process.env?.TELESINK_ENDPOINT;
  if (typeof window !== "undefined") return window.TELESINK_ENDPOINT;
  return null;
};

const enabled = () => {
  if (typeof process !== "undefined") return !process.env?.TELESINK_DISABLED;
  if (typeof window !== "undefined") return !window.TELESINK_DISABLED;
  return true;
};

const uuid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });

const track = async ({
  event,
  text,
  emoji,
  properties = {},
  occurredAt,
  idempotencyKey,
} = {}) => {
  if (!enabled() || !endpoint()) return false;

  const payload = Object.fromEntries(
    Object.entries({
      event,
      text,
      emoji,
      properties,
      occurred_at: new Date(occurredAt ?? Date.now()).toISOString(),
      idempotency_key: idempotencyKey ?? uuid(),
      sdk: { name: "telesink", version: VERSION },
    }).filter(([, v]) => v != null),
  );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `telesink/${VERSION}`,
        "Idempotency-Key": payload.idempotency_key,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return res.ok;
  } catch (e) {
    console.error(`[Telesink] ${e.constructor.name}: ${e.message}`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
};

export { track };
export default { track };
