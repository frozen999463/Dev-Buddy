const fetch = require('node-fetch');

const API_BASE = "http://localhost:5000/api";
// You'll need a valid Firebase ID token for a user who has some progress.
// For this test, you'd manually paste a token here or use a test user.
const TOKEN = "YOUR_TEST_TOKEN_HERE";

async function testEnrolledCourses() {
    if (TOKEN === "YOUR_TEST_TOKEN_HERE") {
        console.log("⚠️ Please provide a valid TOKEN in the script to run this test.");
        return;
    }

    try {
        console.log("🔍 Testing GET /api/progress/enrolled...");
        const res = await fetch(`${API_BASE}/progress/enrolled`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
        const data = await res.json();
        console.log("✅ Enrolled Courses:", JSON.stringify(data, null, 2));

        if (data.length > 0) {
            const courseId = data[0]._id;
            console.log(`\n🔍 Testing PATCH /api/profile/select-course for ${courseId}...`);
            const selectRes = await fetch(`${API_BASE}/profile/select-course`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`
                },
                body: JSON.stringify({ courseId })
            });
            const selectData = await selectRes.json();
            console.log("✅ Selection Result:", JSON.stringify(selectData, null, 2));
        }
    } catch (err) {
        console.error("❌ Test failed:", err);
    }
}

testEnrolledCourses();
