import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type OrderRecord = {
  id: string;
  productId: string;
  productSlug: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  status: "paid";
  createdAt: string;
};

const ORDERS_PATH = path.join(process.cwd(), "data", "orders.json");

function shouldSkipDuplicate(
  orders: OrderRecord[],
  record: OrderRecord,
): boolean {
  if (
    record.stripePaymentIntentId &&
    orders.some((o) => o.stripePaymentIntentId === record.stripePaymentIntentId)
  ) {
    return true;
  }
  if (
    record.stripeSessionId &&
    orders.some((o) => o.stripeSessionId === record.stripeSessionId)
  ) {
    return true;
  }
  return false;
}

/** Persists to data/orders.json locally; on Vercel logs only (filesystem is read-only). */
export async function recordPaidOrder(record: OrderRecord): Promise<void> {
  if (process.env.VERCEL) {
    console.info("[order] paid", JSON.stringify(record));
    return;
  }
  try {
    const raw = await fs.readFile(ORDERS_PATH, "utf8");
    const orders = JSON.parse(raw) as OrderRecord[];
    if (shouldSkipDuplicate(orders, record)) return;
    orders.push({ ...record, id: record.id || randomUUID() });
    await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf8");
  } catch (e) {
    console.error("[order-store] failed to persist", e);
  }
}
