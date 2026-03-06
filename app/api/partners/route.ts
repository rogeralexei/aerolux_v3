import { BlobServiceClient } from "@azure/storage-blob"
import { NextResponse } from "next/server"

export async function GET() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  if (!connectionString) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 500 })
  }

  try {
    const containerName = "partners"
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
    const containerClient = blobServiceClient.getContainerClient(containerName)

    const images: Record<string, string> = {}

    for await (const blob of containerClient.listBlobsFlat()) {
      const name = blob.name
      const ext = name.split(".").pop()?.toLowerCase()
      if (!["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")) continue

      // Use filename without extension as the key, e.g. "ferrari-panama" -> url
      const baseName = name.split("/").pop()?.replace(/\.[^.]+$/, "")?.toLowerCase() ?? ""
      const url = `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${name}`
      images[baseName] = url
    }

    return NextResponse.json(images)
  } catch (error) {
    console.error("Azure Blob partners error:", error)
    return NextResponse.json({ error: "Failed to load partners images" }, { status: 500 })
  }
}