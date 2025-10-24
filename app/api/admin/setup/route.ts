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

    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)

    const existingUser = await collection.findOne({ username })
    if (existingUser) {
      await client.close()
      return Response.json({ error: "Username already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await collection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(),
    })

    await client.close()

    return Response.json({ 
      success: true, 
      message: "Admin user created successfully" 
    })
  } catch (error) {
    console.error("Error creating admin user:", error)
    return Response.json({ error: "Failed to create admin user" }, { status: 500 })
  }
}
