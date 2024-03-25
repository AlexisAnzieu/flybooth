import { sql } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(req: any) {
  noStore();
  const { searchParams } = new URL(req.url);
  const flyboothId = searchParams.get("flyboothId");

  if (!flyboothId) {
    return Response.json({ error: "flyboothId is required" }, { status: 400 });
  }

  const res = await sql(
    `select * from text where flyboothId = ? order by created_at desc limit 300`,
    [flyboothId]
  );
  return Response.json(res);
}

export async function POST(req: any) {
  try {
    const { text, author, flyboothId } = await req.json();

    if (!flyboothId || !text || !author) {
      return Response.json(
        { error: "flyboothId is required" },
        { status: 400 }
      );
    }

    const res = await sql(
      `INSERT INTO text (message, author, flyboothId) VALUES (?, ?, ? )`,
      [text, author, flyboothId]
    );
    return Response.json(res);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
