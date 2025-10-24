const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

async function setupAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("registration_db");
    const collection = db.collection("admin_users");

    const existingAdmin = await collection.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("12345", 10);

    await collection.insertOne({
      username: "admin",
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: 12345");
  } catch (error) {
    console.error("Error setting up admin:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

setupAdmin();
