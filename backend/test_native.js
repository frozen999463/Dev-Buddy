const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

console.log("Attempting native connection to:", uri.replace(/:([^@]+)@/, ':****@'));

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    sslValidate: false,
});

async function run() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to MongoDB via native driver");
        const db = client.db('dev-buddy');
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));
    } catch (err) {
        console.error("❌ Native connection failed:");
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
