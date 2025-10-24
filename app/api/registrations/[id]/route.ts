import { MongoClient, ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "registration_db"
const COLLECTION_NAME = "registrations"

async function getDatabase() {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  return client.db(DB_NAME)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { fullName, email } = body

    const db = await getDatabase()
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          fullName,
          email,
          updatedAt: new Date(),
        },
      },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(params.id),
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
