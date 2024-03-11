import { CLOUDINARY_FOLDER } from "@/lib/constants";
import cloudinary from "cloudinary";
import { unstable_noStore as noStore } from "next/cache";

const DEFAULT_MAX_RESULTS = 20;

cloudinary.v2.config({
  secure: true,
});

export type Resource = {
  public_id: string;
  secure_url: string;
  created_at: string;
};

type CloudinaryResponse = {
  resources: Resource[];
};

export async function POST(req: Request) {
  noStore();
  const { flyboothId } = await req.json();

  const url = cloudinary.v2.utils.download_zip_url({
    prefixes: [`${CLOUDINARY_FOLDER}/${flyboothId}`],
  });

  return Response.json(url);
}

export async function GET(req: Request) {
  noStore();

  const { searchParams } = new URL(req.url);
  const flyboothId = searchParams.get("flyboothId");
  const maxResults =
    Number(searchParams.get("maxResults")) || DEFAULT_MAX_RESULTS;

  if (!flyboothId) {
    return Response.json({ error: "flyboothId is required" }, { status: 400 });
  }

  try {
    const res: CloudinaryResponse =
      await cloudinary.v2.api.resources_by_asset_folder(
        `${CLOUDINARY_FOLDER}/${flyboothId}`,
        {
          type: "upload",
          max_results: maxResults,
          direction: "desc",
        }
      );
    return Response.json(res);
  } catch (err: any) {
    if (err.error.http_code === 404) {
      return Response.json([]);
    }
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
