import { BlobServiceClient } from "@azure/storage-blob"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
    const containerClient = blobServiceClient.getContainerClient(containerName)

    const mediaItems = []
    let id = 1

    for await (const blob of containerClient.listBlobsFlat()) {
      const name = blob.name
      const ext = name.split(".").pop()?.toLowerCase()

      const isVideo = ["mp4", "mov", "webm"].includes(ext ?? "")
      const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")

      if (!isVideo && !isImage) continue

      const url = `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${name}`

      // Try to infer category from folder name or filename prefix
      // e.g. "aircraft/jet-interior.jpg" or "aircraft-jet-interior.jpg"
      let category = "experience"
      const lowerName = name.toLowerCase()
      if (lowerName.includes("aircraft") || lowerName.includes("jet") || lowerName.includes("plane")) {
        category = "aircraft"
      } else if (lowerName.includes("destination") || lowerName.includes("city") || lowerName.includes("landscape")) {
        category = "destinations"
      }

      // Use filename as title (strip extension, replace dashes/underscores)
      const baseName = name.split("/").pop()?.replace(/\.[^.]+$/, "") ?? name
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
    console.error("Azure Blob error:", error)
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 })
  }
}
