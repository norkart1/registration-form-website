import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "registration_db"
const COLLECTION_NAME = "admin_users"

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return Response.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      )
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(DB_NAME)
    const adminCollection = db.collection(COLLECTION_NAME)

    const admin = await adminCollection.findOne({ username: "admin" })

    if (!admin) {
      await client.close()
      return Response.json(
        { message: "Admin not found" },
        { status: 404 }
      )
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password)

    if (!isPasswordValid) {
      await client.close()
      return Response.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      )
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    await adminCollection.updateOne(
      { username: "admin" },
      { $set: { password: hashedNewPassword } }
    )

    await client.close()

    return Response.json(
      { message: "Password changed successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Change password error:", error)
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
