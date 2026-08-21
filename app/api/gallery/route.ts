import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function GET() {
  try {
    const bucketName = process.env.R2_BUCKET_NAME!
    const publicUrl = process.env.R2_PUBLIC_URL!
    const prefix = "galeria/"

    const mediaItems = []
    let id = 1

    const { Contents } = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName, Prefix: prefix }),
    )

    for (const obj of Contents ?? []) {
      const name = obj.Key
      if (!name) continue
      const ext = name.split(".").pop()?.toLowerCase()

      const isVideo = ["mp4", "mov", "webm"].includes(ext ?? "")
      const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")

      if (!isVideo && !isImage) continue

      const url = `${publicUrl}/${name}`

      // Infer category from folder prefix, e.g. "gallery/lifestyle/photo.jpg" → "lifestyle"
      const relativeName = name.slice(prefix.length)
      const folder = relativeName.includes("/") ? relativeName.split("/")[0].toLowerCase() : ""
      const validCategories = ["lifestyle", "clientes", "vistas"]
      const category = validCategories.includes(folder) ? folder : "lifestyle"

      // Use filename as title (strip extension, replace dashes/underscores)
      const baseName = relativeName.split("/").pop()?.replace(/\.[^.]+$/, "") ?? relativeName
      const title = baseName.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

      mediaItems.push({
        id: id++,
        type: isVideo ? "video" : "image",
        category,
        title,
        description: "",
        image: url,
        thumbnail: url,
      })
    }

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error("R2 error:", error)
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 })
  }
}
