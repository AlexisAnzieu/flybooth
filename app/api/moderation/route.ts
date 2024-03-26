import { unstable_noStore as noStore } from "next/cache";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  secure: true,
});

export async function GET(req: Request) {
  noStore();

  const { searchParams } = new URL(req.url);
  const pictureUrl = searchParams.get("pictureUrl");
  const publicId = searchParams.get("publicId");

  if (!pictureUrl || !publicId) {
    return Response.json({ error: "pictureUrl and publicId are required" });
  }

  const params = new URLSearchParams({
    url: pictureUrl,
    models: "nudity-2.0",
    api_user: process.env.SIGHTENGINE_API_USER || "",
    api_secret: process.env.SIGHTENGINE_API_SECRET || "",
  });

  const response = await fetch(
    `https://api.sightengine.com/1.0/check.json?${params.toString()}`
  );

  if (!response.ok) {
    console.error(`API request failed with status ${response.status}`);
    return Response.json({ error: "API request failed" }, { status: 500 });
  }

  const data = await response.json();

  if (data.nudity.sexual_display > 0.5 || data.nudity.sexual_activity > 0.5) {
    console.log("Nudity detected, deleting image from Cloudinary");
    const res = await cloudinary.v2.api.delete_resources([publicId]);
    return Response.json(res);
  }

  return Response.json(data);
}
