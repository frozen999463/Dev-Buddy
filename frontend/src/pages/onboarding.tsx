import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Course icons mapping
const courseIcons: Record<string, string> = {
  python: "🐍",
  html: "🌐",
  css: "🎨",
  javascript: "📜",
  react: "⚛️",
  c: "©️",
  java: "☕",
  default: "�"
};

const experienceOptions = [
  { id: "beginner", label: "Complete beginner", icon: "📊" },
  { id: "some-exp", label: "Some experience,but need a refresher", icon: "📊" },
  { id: "confident", label: "Confident in my coding skills", icon: "📊" },
  { id: "expert", label: "Expert at coding", icon: "📊" },
];

const goalOptions = [
  { id: "explore", label: "Explore what is coding", icon: "📝" },
  { id: "challenge", label: "Challenge my brain", icon: "🧠" },
  { id: "career", label: "Boost my career", icon: "🏫" },
  { id: "fun", label: "Just for fun", icon: "🎮" },
  { id: "education", label: "Support my education", icon: "🎓" },
  { id: "website", label: "Build my own website", icon: "🖥️" },
  { id: "creative", label: "Expend creative skills", icon: "🎨" },
  { id: "other", label: "Other", icon: "💬" },
];

export default function OnboardingName() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); // Will store course ID
  const [selectedCourseName, setSelectedCourseName] = useState(""); // For display
  const [experienceLevel, setExperienceLevel] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const navigate = useNavigate();

  // Fetch courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      console.log("🔐 Current user:", user?.uid);

      if (!user) {
        alert("You must be logged in to complete onboarding");
        return;
      }

      const token = await user.getIdToken();

      const payload = {
        name,
        selectedCourse,
        experienceLevel,
        learningGoal
      };

      console.log("📤 Sending onboarding data:", payload);

      const response = await fetch("http://localhost:5000/api/onboarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error response:", errorData);
        throw new Error("Failed to save onboarding data");
      }

      const data = await response.json();
      console.log("✅ Onboarding successful:", data);

      // Navigate to the selected course's journey page
      navigate(`/journey/${selectedCourse}`);
    } catch (err) {
      console.error("❌ Onboarding error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Bot Header */}
      <div className="flex flex-col items-center mb-8 max-w-2xl w-full">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200 shadow-sm overflow-hidden">
            {/* Character placeholder - in a real app this would be your SVG bot */}
            <span className="text-5xl">🤖</span>
          </div>

          <div className="relative bg-[#2D315E] text-white p-4 rounded-2xl rounded-tl-none shadow-lg max-w-md">
            <p className="text-lg font-medium">
              {step === 1 && "Welcome to DevBuddy! What should we call you?"}
              {step === 2 && `Hello, ${name} Which course would you like to start with?`}
              {step === 3 && "What is your level of coding experience?"}
              {step === 4 && `Why are you learning ${selectedCourseName}?`}
            </p>
            {/* Speech bubble tail */}
            <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-[#2D315E] border-l-[10px] border-l-transparent"></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] w-full max-w-lg transition-all">

          {step === 1 && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-6 py-4 text-lg focus:border-indigo-400 focus:outline-none transition-colors"
              />
              <button
                onClick={nextStep}
                disabled={!name.trim()}
                className="w-full bg-[#5E6290] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#4E527D] disabled:opacity-50 transition-all shadow-md"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {loadingCourses ? (
                <div className="text-center py-8 text-gray-500">Loading courses...</div>
              ) : courses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No courses available yet.</div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {courses.map((course) => {
                    const icon = courseIcons[course.title.toLowerCase()] || courseIcons.default;
                    return (
                      <button
                        key={course._id}
                        onClick={() => {
                          setSelectedCourse(course._id);
                          setSelectedCourseName(course.title);
                          nextStep();
                        }}
                        className={`flex items-center gap-3 border-2 p-4 rounded-xl text-left transition-all hover:bg-gray-50 ${selectedCourse === course._id ? "border-indigo-500 bg-indigo-50" : "border-gray-100"
                          }`}
                      >
                        <span className="text-2xl">{icon}</span>
                        <span className="text-gray-700 font-medium">{course.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <button
                onClick={prevStep}
                className="w-full text-gray-500 font-medium pt-4 hover:text-gray-700"
              >
                Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {experienceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setExperienceLevel(opt.label);
                    nextStep();
                  }}
                  className={`w-full flex items-center gap-4 border-2 p-4 rounded-xl text-left transition-all hover:bg-gray-50 ${experienceLevel === opt.label ? "border-indigo-500 bg-indigo-50" : "border-gray-100"
                    }`}
                >
                  <span className="text-xl opacity-60">{opt.icon}</span>
                  <span className="text-gray-700 font-medium">{opt.label}</span>
                </button>
              ))}
              <button
                onClick={prevStep}
                className="w-full text-gray-500 font-medium pt-4 hover:text-gray-700"
              >
                Back
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLearningGoal(opt.label)}
                    className={`flex items-center gap-3 border-2 p-4 rounded-xl text-left transition-all hover:bg-gray-50 ${learningGoal === opt.label ? "border-indigo-500 bg-indigo-50" : "border-gray-100"
                      }`}
                  >
                    <span className="text-lg opacity-60">{opt.icon}</span>
                    <span className="text-gray-700 font-medium text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="flex-1 text-gray-500 font-medium hover:text-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!learningGoal || loading}
                  className="flex-[2] bg-[#2D315E] text-white py-4 rounded-xl text-lg font-semibold hover:bg-black transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Completing..." : "CONTINUE"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
