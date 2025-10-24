import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "registration_db"
const COLLECTION_NAME = "registrations"

async function getDatabase() {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  return client.db(DB_NAME)
}

export async function GET() {
  try {
    const db = await getDatabase()
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
    const { fullName, email, address, country, state } = body

    if (!fullName || !email || !address || !country || !state) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()
    const result = await db.collection(COLLECTION_NAME).insertOne({
      fullName,
      email,
      address,
      country,
      state,
      createdAt: new Date(),
    })

    return Response.json({ _id: result.insertedId, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating registration:", error)
    return Response.json({ error: "Failed to create registration" }, { status: 500 })
  }
}
