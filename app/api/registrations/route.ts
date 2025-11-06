import clientPromise from "@/lib/mongodb"
import { MongoClient } from "mongodb"
import { sendWhatsAppMessage, getWhatsAppConfig } from "@/lib/whatsapp"

const DB_NAME = "registration_db"
const COLLECTION_NAME = "registrations"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const registrations = await db.collection(COLLECTION_NAME).find({}).toArray()
    return Response.json(registrations)
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return Response.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, whatsappNumber, mobileNumber, email, profileImage } = body

    if (!fullName || !whatsappNumber || !mobileNumber || !email || !profileImage) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (typeof profileImage !== "string" || !profileImage.startsWith("data:image/")) {
      return Response.json({ error: "Invalid image format. Must be a valid image data URL" }, { status: 400 })
    }

    if (profileImage.length > 7 * 1024 * 1024) {
      return Response.json({ error: "Image too large. Maximum size is 7MB" }, { status: 400 })
    }

    const allowedTypes = ["data:image/jpeg", "data:image/jpg", "data:image/png", "data:image/gif", "data:image/webp"]
    const hasValidType = allowedTypes.some(type => profileImage.startsWith(type))
    if (!hasValidType) {
      return Response.json({ error: "Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed" }, { status: 400 })
    }

    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 3000)
      )
    ]) as MongoClient

    const db = client.db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).insertOne({
      fullName,
      whatsappNumber,
      mobileNumber,
      email,
      profileImage,
      createdAt: new Date(),
    })

    // Send WhatsApp confirmation message
    try {
      const whatsappConfig = getWhatsAppConfig()
      await sendWhatsAppMessage(whatsappConfig, {
        to: whatsappNumber,
        message: `Hello ${fullName}! 👋\n\nThank you for registering with us. Your registration has been successfully completed.\n\nRegistration Details:\n- Name: ${fullName}\n- Email: ${email}\n- WhatsApp: ${whatsappNumber}\n- Mobile: ${mobileNumber}\n\nWe'll contact you shortly for further updates.\n\nBest regards,\nTeam`
      })
      console.log(`WhatsApp message sent successfully to ${whatsappNumber}`)
    } catch (whatsappError) {
      console.error("Failed to send WhatsApp message:", whatsappError)
      // Don't fail the registration if WhatsApp fails, just log it
    }

    return Response.json({ success: true, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating registration:", error)
    return Response.json({ error: "Failed to create registration" }, { status: 500 })
  }
}
