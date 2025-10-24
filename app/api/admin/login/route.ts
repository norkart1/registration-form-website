import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "registration_db"
const COLLECTION_NAME = "admin_users"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return Response.json({ error: "Username and password are required" }, { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)

    const user = await collection.findOne({ username })

    await client.close()

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")
    return Response.json({ token, success: true })
  } catch (error) {
    console.error("Error during login:", error)
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}
