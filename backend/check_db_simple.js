const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://Abhijith:abhi123@dev-buddy.mahtb3z.mongodb.net/?appName=dev-buddy";

async function check() {
  try {
    console.log("Connecting to:", MONGO_URI.split("@")[1]); // Hide password
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected");

    const Course = mongoose.model("Course", new mongoose.Schema({ title: String }));
    const User = mongoose.model("User", new mongoose.Schema({ email: String }));

    const courseCount = await Course.countDocuments();
    const userCount = await User.countDocuments();

    console.log(`Courses: ${courseCount}`);
    console.log(`Users: ${userCount}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

check();
