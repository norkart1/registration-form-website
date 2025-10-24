import clientPromise from "@/lib/mongodb"

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
    const { fullName, email } = body

    if (!fullName || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).insertOne({
      fullName,
      email,
      createdAt: new Date(),
    })

    return Response.json({ _id: result.insertedId, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating registration:", error)
    return Response.json({ error: "Failed to create registration" }, { status: 500 })
  }
}
