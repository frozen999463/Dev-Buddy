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
  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        profileImage
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
          src="/images/onboarding_mascot.png"
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

      {/* Split Screen Layout: Image Left, Container Right */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-12 lg:gap-24 -mt-10">

        {/* Left Side - Hero Image */}
        <div className="hidden md:flex flex-1 justify-end items-center max-w-2xl">
          <img
            src="/images/1.png"
            alt="Onboarding Hero"
            className="w-full h-auto max-h-[600px] object-contain drop-shadow-2xl rounded-3xl"
          />
        </div>

        {/* Right Side - Selection Card */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center max-w-md w-full">
          <div className="bg-[#373F6E] p-8 md:p-10 rounded-[2.5rem] shadow-[0px_10px_40px_rgba(0,0,0,0.2)] w-full min-h-[450px] flex flex-col items-center justify-center transition-all duration-300">

            {/* Profile Image Section */}
            <div className="mb-8 relative group cursor-pointer" onClick={() => document.getElementById('profile-upload')?.click()}>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center transition-all group-hover:border-white/40 shadow-xl">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/40 text-4xl md:text-5xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                </div>
              </div>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

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
