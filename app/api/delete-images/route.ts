import { CLOUDINARY_FOLDER } from "@/lib/constants";
import cloudinary from "cloudinary";
import { unstable_noStore as noStore } from "next/cache";

cloudinary.v2.config({
  secure: true,
});

export async function POST() {
  noStore();

  const resAssets: { resources: { public_id: string; created_at: string }[] } =
    await cloudinary.v2.api.resources_by_asset_folder(
      `${CLOUDINARY_FOLDER}/*/*`,
      {
        type: "upload",
        max_results: 500,
        direction: "asc",
      }
    );

  const oneWeeksAgo = new Date();
  oneWeeksAgo.setDate(oneWeeksAgo.getDate() - 7);

  const assetsToDelete = resAssets.resources
    .filter((res) => new Date(res.created_at) < oneWeeksAgo)
    .map((res) => res.public_id);

  if (assetsToDelete.length === 0) {
    return Response.json({ message: "No assets to delete" });
  }

  const assetsDeletion = await cloudinary.v2.api.delete_resources(
    assetsToDelete
  );

  return Response.json(assetsDeletion);
}
