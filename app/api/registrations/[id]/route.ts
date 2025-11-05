import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

const DB_NAME = "registration_db"
const COLLECTION_NAME = "registrations"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json()
    const { fullName, whatsappNumber, mobileNumber, email, profileImage } = body
    const { id } = await params

    if (!fullName || !whatsappNumber || !mobileNumber || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (profileImage !== undefined && profileImage !== "") {
      if (typeof profileImage !== "string" || !profileImage.startsWith("data:image/")) {
        return Response.json({ error: "Invalid image format. Must be a valid image data URL" }, { status: 400 })
      }
      if (profileImage.length > 7 * 1024 * 1024) {
        return Response.json({ error: "Image too large. Maximum size is 5MB" }, { status: 400 })
      }
      const allowedTypes = ["data:image/jpeg", "data:image/jpg", "data:image/png", "data:image/gif", "data:image/webp"]
      const hasValidType = allowedTypes.some(type => profileImage.startsWith(type))
      if (!hasValidType) {
        return Response.json({ error: "Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed" }, { status: 400 })
      }
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    
    const updateData: any = {
      fullName,
      whatsappNumber,
      mobileNumber,
      email,
      updatedAt: new Date(),
    }

    if (profileImage !== undefined) {
      updateData.profileImage = profileImage
    }

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return Response.json({ error: "Registration not found" }, { status: 404 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error updating registration:", error)
    return Response.json({ error: "Failed to update registration" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return Response.json({ error: "Registration not found" }, { status: 404 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting registration:", error)
    return Response.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}
