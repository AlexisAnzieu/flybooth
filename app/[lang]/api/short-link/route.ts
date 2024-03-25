import { createShortLink } from "@/lib/constants";
import { set, get } from "@/lib/redis";
import { unstable_noStore as noStore } from "next/cache";
import { env } from "process";

export async function POST(req: Request) {
  noStore();

  const { searchParams } = new URL(req.url);
  const flyboothId = searchParams.get("flyboothId");

  if (!flyboothId) {
    return Response.json({ error: "flyboothId is required" });
  }

  if (env.NODE_ENV === "development") {
    return Response.json(flyboothId);
  }

  const key = createShortLink(flyboothId);
  const res = await set(key, flyboothId, 30);

  return Response.json(res);
}

export async function GET(req: Request) {
  noStore();

  const { searchParams } = new URL(req.url);
  const pin = searchParams.get("pin");

  if (!pin) {
    return Response.json({ error: "pin is required" });
  }

  const res = await get(pin);

  return Response.json(res);
}
