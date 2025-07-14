import { set } from "@/lib/redis";

export async function POST() {
  await set("renew", Date.now());
  return Response.json({ message: "Renew key set", value: Date.now() });
}
