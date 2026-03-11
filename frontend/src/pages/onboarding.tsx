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
        learningGoal,

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

      // Dispatch event to sync header
      window.dispatchEvent(new Event("profileUpdated"));

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
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-gradient-to-br from-[#f8f9ff] via-[#fdfdfd] to-[#f0f2ff] relative font-sans">

      {/* Top Left - Mascot & Speech Bubble */}
      <div className="flex items-start gap-6 pl-28 md:pl-40 pt-6">
        <img
          src="/images/logodb1@2x.png"
          alt="Mascot"
          className="w-20 md:w-28 h-auto flex-shrink-0 animate-float"
        />
        <div className="relative mt-2">
          <div className="relative bg-[#373F6E] text-white px-5 py-3 rounded-2xl rounded-tl-none shadow-lg max-w-xs md:max-w-sm">
            <p className="text-sm md:text-base font-bold tracking-wide">
              {step === 1 && "Welcome to DevBuddy! What should we call you?"}
              {step === 2 && `Hello, ${name}! Which course would you like to start with?`}
              {step === 3 && "What is your level of coding experience?"}
              {step === 4 && `Why are you learning ${selectedCourseName}?`}
            </p>
            <div className="absolute top-0 -left-3 w-4 h-4 bg-[#373F6E]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
          </div>
        </div>
      </div>

      {/* Selection Card Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 -mt-10">

        {/* Right Side - Selection Card - 3D Wrapper */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center max-w-md w-full [perspective:2000px]">
          <div className="bg-gradient-to-br from-[#373F6E] to-[#252b52] p-8 md:p-10 rounded-[2.5rem] 
            shadow-[20px_40px_100px_rgba(0,0,0,0.5),0_0_60px_rgba(30,144,255,0.3),inset_0_2px_10px_rgba(255,255,255,0.1)] 
            w-full min-h-[450px] flex flex-col items-center justify-center transition-all duration-500 
            border-t border-l border-white/10 border-b-[10px] border-r-[5px] border-black/40
            [transform:rotateX(6deg)_rotateY(-6deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)] hover:shadow-[0_20px_80px_rgba(30,144,255,0.5)]">



            {step === 1 && (
              <div className="space-y-8 text-center md:text-left">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-white/20 rounded-2xl px-6 py-4 text-xl bg-[#98A1EC] shadow-xl focus:ring-4 focus:ring-white/10 outline-none transition-all placeholder:text-[#373F6E]/60 text-[#373F6E] text-center md:text-left font-bold"
                />
              </div>
            )}

            {/* Other steps content... */}
            {step === 2 && (
              <div className="space-y-4">
                {loadingCourses ? (
                  <div className="text-center py-8 text-grey">Loading courses...</div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No courses available yet.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {courses.map((course) => {
                      const icon = courseIcons[course.title.toLowerCase()] || courseIcons.default;
                      return (
                        <button
                          key={course._id}
                          onClick={() => {
                            setSelectedCourse(course._id);
                            setSelectedCourseName(course.title);
                          }}
                          className={`flex items-center gap-4 border-[3px] p-4 rounded-xl text-left transition-all shadow-sm ${selectedCourse === course._id
                            ? "bg-white border-white text-[#373F6E]"
                            : "bg-white/10 border-white/10 hover:border-white/30 text-white"
                            }`}
                        >
                          <span className="text-2xl">{icon}</span>
                          <span className={`font-bold text-lg ${selectedCourse === course._id ? "text-[#373F6E]" : "text-white"}`}>{course.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {experienceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setExperienceLevel(opt.label)}
                    className={`w-full flex items-center gap-4 border-[2px] p-4 rounded-xl text-left transition-all shadow-sm ${experienceLevel === opt.label
                      ? "bg-white border-white text-[#373F6E]"
                      : "bg-white/10 border-white/10 hover:border-white/30 text-white"
                      }`}
                  >
                    <div className="flex items-end gap-1 h-8 w-10 border-r-2 border-white/40 pr-2">
                      <div className={`w-1.5 rounded-t-sm ${experienceLevel === opt.label ? "bg-[#373F6E]" : "bg-white"} ${opt.id === 'beginner' ? 'h-2 opacity-30' : opt.id === 'some-exp' ? 'h-4 opacity-50' : opt.id === 'confident' ? 'h-6 opacity-70' : 'h-8'}`}></div>
                      <div className={`w-1.5 rounded-t-sm ${experienceLevel === opt.label ? "bg-[#373F6E]" : "bg-white"} ${opt.id === 'beginner' ? 'h-0' : opt.id === 'some-exp' ? 'h-2' : opt.id === 'confident' ? 'h-4' : 'h-6'}`}></div>
                      <div className={`w-1.5 rounded-t-sm ${experienceLevel === opt.label ? "bg-[#373F6E]" : "bg-white"} ${opt.id === 'beginner' ? 'h-0' : opt.id === 'some-exp' ? 'h-0' : opt.id === 'confident' ? 'h-2' : 'h-4'}`}></div>
                    </div>
                    <span className={`font-bold text-base md:text-lg ${experienceLevel === opt.label ? "text-[#373F6E]" : "text-white"}`}>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setLearningGoal(opt.label)}
                      className={`flex items-center gap-4 border-[2px] p-3 rounded-xl text-left transition-all shadow-sm ${learningGoal === opt.label
                        ? "bg-white border-white text-[#373F6E]"
                        : "bg-white/10 border-white/10 hover:border-white/30 text-white"
                        }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span className={`font-bold text-sm md:text-base ${learningGoal === opt.label ? "text-[#373F6E]" : "text-white"}`}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-10 z-10 w-full">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 text-gray-400/80 font-bold text-lg uppercase tracking-wider hover:text-white transition-all font-['Bebas_Neue'] cursor-pointer"
                >
                  BACK
                </button>
              )}
              <button
                onClick={step === 4 ? handleFinalSubmit : nextStep}
                disabled={(step === 1 && !name.trim()) || (step === 2 && !selectedCourse) || (step === 3 && !experienceLevel) || (step === 4 && !learningGoal) || loading}
                className="flex-1 max-w-[240px] px-10 py-3 rounded-2xl bg-white text-[#373F6E] font-bold text-xl uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-['Bebas_Neue']"
              >
                {loading ? "..." : (step === 4 ? "GET STARTED" : "CONTINUE")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
