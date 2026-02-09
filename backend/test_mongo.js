const mongoose = require('mongoose');
require('dotenv').config();

const uri = "mongodb://Abhijith:abhi123@ac-gwy92uj-shard-00-00.mahtb3z.mongodb.net:27017/dev-buddy?ssl=true&authSource=admin&directConnection=true";

console.log("Attempting to connect to:", uri.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    tlsAllowInvalidCertificates: true,
    family: 4,
})
    .then(() => {
        console.log("✅ Successfully connected to MongoDB");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ Connection failed:");
        console.error(err);
        process.exit(1);
    });
