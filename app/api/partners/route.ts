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
  const bucketName = process.env.R2_BUCKET_NAME
  const publicUrl = process.env.R2_PUBLIC_URL
  if (!bucketName || !publicUrl) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 500 })
  }

  try {
    const prefix = "aliados/"
    const images: Record<string, string> = {}

    const { Contents } = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName, Prefix: prefix }),
    )

    for (const obj of Contents ?? []) {
      const name = obj.Key
      if (!name) continue
      const ext = name.split(".").pop()?.toLowerCase()
      if (!["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")) continue

      // Use filename without extension as the key, e.g. "ferrari-panama" -> url
      const baseName = name.split("/").pop()?.replace(/\.[^.]+$/, "")?.toLowerCase() ?? ""
      const url = `${publicUrl}/${name}`
      images[baseName] = url
    }

    return NextResponse.json(images)
  } catch (error) {
    console.error("R2 partners error:", error)
    return NextResponse.json({ error: "Failed to load partners images" }, { status: 500 })
  }
}
