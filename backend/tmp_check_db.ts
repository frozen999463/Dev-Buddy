import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Abhijith:abhi123@dev-buddy.mahtb3z.mongodb.net/?appName=dev-buddy";

async function testConnection() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected successfully");

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`- ${col.name}: ${count} documents`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  }
}

testConnection();
