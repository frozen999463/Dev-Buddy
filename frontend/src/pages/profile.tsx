import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, Mail, Star, Flame, Trophy, Edit2, Save, X, Upload } from "lucide-react";
import { useRef } from "react";

interface UserData {
    name: string;
    email: string;
    role: string;
    onboarded: boolean;
    experienceLevel: string;
    learningGoal: string;
    totalXP: number;
    currentStreak: number;
    profilePicture?: string;
    selectedCourse: string; // ID
    enrolledCourses: Array<{
        _id: string;
        title: string;
        slug: string;
        thumbnail?: string;
        description: string;
    }>;
    progress: {
        courseName: string;
        totalNodes: number;
        completedNodes: number;
        percent: number;
    } | null;
}

const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Olive",
];

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editAvatar, setEditAvatar] = useState("");
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const auth = getAuth();
                const firebaseUser = auth.currentUser;

                if (!firebaseUser) {
                    navigate("/login");
                    return;
                }

                const token = await firebaseUser.getIdToken();
                const response = await fetch("http://localhost:5000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch profile");
                const data = await response.json();
                setUser(data);
                setEditName(data.name || "");
                setEditAvatar(data.profilePicture || avatars[0]);
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleUpdateProfile = async () => {
        try {
            setSaving(true);
            const auth = getAuth();
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) return;

            const token = await firebaseUser.getIdToken();
            const response = await fetch("http://localhost:5000/api/profile/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: editName,
                    profilePicture: editAvatar
                }),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            setUser(prev => prev ? { ...prev, name: editName, profilePicture: editAvatar } : null);
            setIsEditing(false);

            // Dispatch event to sync header
            window.dispatchEvent(new Event("profileUpdated"));

            alert("Profile updated! ✨");
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const auth = getAuth();
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) return;

            const token = await firebaseUser.getIdToken();
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await fetch("http://localhost:5000/api/profile/upload-avatar", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload avatar");

            const data = await response.json();
            setEditAvatar(data.profilePicture);
            setUser(prev => prev ? { ...prev, profilePicture: data.profilePicture } : null);

            // Sync header
            window.dispatchEvent(new Event("profileUpdated"));

            alert("Avatar uploaded! 📸");
        } catch (err) {
            console.error("Upload error:", err);
            alert("Failed to upload avatar.");
        } finally {
            setUploading(false);
        }
    };

    const handleSetPrimary = async (courseId: string) => {
        try {
            setSaving(true);
            const auth = getAuth();
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) return;

            const token = await firebaseUser.getIdToken();
            const response = await fetch("http://localhost:5000/api/profile/select-course", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ courseId }),
            });

            if (!response.ok) throw new Error("Failed to update primary course");

            // Refresh profile data
            const updatedProfileResponse = await fetch("http://localhost:5000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedData = await updatedProfileResponse.json();
            setUser(updatedData);

            // Dispatch event to sync header
            window.dispatchEvent(new Event("profileUpdated"));

            alert("Primary course updated! 🎓");
        } catch (err) {
            console.error("Error updating primary course:", err);
            alert("Failed to update primary course.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-[#373F6E]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#373F6E]"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 font-sans py-12 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-8 relative">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-8 right-8 p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-[#373F6E] transition-all"
                        >
                            <Edit2 size={20} />
                        </button>
                    ) : (
                        <div className="absolute top-8 right-8 flex gap-2">
                            <button
                                onClick={handleUpdateProfile}
                                disabled={saving}
                                className="p-3 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 transition-all disabled:opacity-50"
                            >
                                <Save size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditName(user.name || "");
                                    setEditAvatar(user.profilePicture || avatars[0]);
                                }}
                                className="p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#373F6E]/10 flex items-center justify-center bg-gray-50">
                                {user.profilePicture || editAvatar ? (
                                    <img src={isEditing ? editAvatar : user.profilePicture || avatars[0]} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon size={64} className="text-[#373F6E]" />
                                )}
                            </div>
                            {isEditing && (
                                <div className="mt-4 space-y-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-[#373F6E] font-bold text-xs hover:bg-gray-200 transition-all disabled:opacity-50"
                                        >
                                            <Upload size={14} />
                                            {uploading ? "Uploading..." : "Upload from Computer"}
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
                                        <p className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Or choose an avatar</p>
                                        {avatars.map((av, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setEditAvatar(av)}
                                                className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${editAvatar === av ? "border-[#373F6E] scale-110 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                                            >
                                                <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-center md:text-left space-y-4 flex-1">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full text-2xl font-black text-[#1a1a1a] p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-[#373F6E] outline-none transition-all"
                                    />
                                </div>
                            ) : (
                                <h1 className="text-4xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-wider font-['Bebas_Neue']">
                                    {user.name || "Adventurer"}
                                </h1>
                            )}

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 text-gray-500 font-bold">
                                    <Mail size={18} />
                                    <span>{user.email}</span>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest">
                                    {user.role}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<Star className="text-yellow-500" />} label="Total XP" value={user.totalXP} color="border-yellow-200" />
                    <StatCard icon={<Flame className="text-orange-500" />} label="Current Streak" value={`${user.currentStreak} Days`} color="border-orange-200" />
                    <StatCard icon={<Trophy className="text-blue-500" />} label="Goal" value={user.learningGoal || "N/A"} color="border-blue-200" />
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-black text-[#373F6E] uppercase tracking-widest font-['Bebas_Neue'] mb-6">Learning Path</h2>
                        <div className="space-y-6">
                            <DetailRow
                                label="Primary Course"
                                value={user.progress?.courseName || "No course selected"}
                            />
                            {user.progress && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress</span>
                                        <span className="text-sm font-black text-[#373F6E]">{user.progress.percent}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#98A1EC] transition-all duration-1000"
                                            style={{ width: `${user.progress.percent}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                                        {user.progress.completedNodes} / {user.progress.totalNodes} NODES COMPLETED
                                    </p>
                                </div>
                            )}
                            <DetailRow label="Experience Level" value={user.experienceLevel || "Not set"} />
                        </div>
                    </div>

                    <div className="bg-[#373F6E] rounded-3xl p-8 shadow-lg text-white">
                        <h2 className="text-2xl font-black uppercase tracking-widest font-['Bebas_Neue'] mb-6">Join Next Lesson</h2>
                        <p className="opacity-80 mb-6">Continue where you left off and reach your daily goal!</p>
                        <button
                            onClick={() => navigate(user.selectedCourse ? `/journey/${user.selectedCourse}` : "/courses")}
                            className="w-full py-4 rounded-xl bg-orange-400 hover:bg-orange-500 text-white font-black text-xl uppercase tracking-widest transition-all"
                        >
                            Continue Learning
                        </button>
                    </div>
                </div>

                {/* Enrolled Courses Section */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-black text-[#373F6E] uppercase tracking-widest font-['Bebas_Neue'] mb-8">Switch to Other Courses</h2>
                    {user.enrolledCourses && user.enrolledCourses.filter(c => c._id !== (user.progress?.courseName ? user.enrolledCourses.find(ec => ec.title === user.progress?.courseName)?._id : user.selectedCourse)).length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {user.enrolledCourses
                                .filter(course => {
                                    // Use course title or ID for exclusion to be safe
                                    const activeId = user.progress?.courseName
                                        ? user.enrolledCourses.find(ec => ec.title === user.progress?.courseName)?._id
                                        : user.selectedCourse;
                                    return course._id !== activeId;
                                })
                                .map((course) => (
                                    <div key={course._id} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 border border-gray-100 group transition-all hover:shadow-md">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-[#373F6E]/10 overflow-hidden flex items-center justify-center shrink-0">
                                                {course.thumbnail ? (
                                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-2xl font-bold text-[#373F6E]">{course.title[0]}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[#1a1a1a]">{course.title}</h3>
                                                <p className="text-sm text-gray-400 font-medium line-clamp-1">{course.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleSetPrimary(course._id)}
                                                disabled={saving}
                                                className="px-4 py-2 rounded-xl bg-white border-2 border-[#373F6E] text-[#373F6E] font-black text-xs uppercase tracking-widest hover:bg-[#373F6E] hover:text-white transition-all disabled:opacity-50"
                                            >
                                                Set as Primary
                                            </button>
                                            <button
                                                onClick={() => navigate(`/journey/${course._id}`)}
                                                className="p-3 rounded-xl bg-gray-200 text-[#373F6E] hover:bg-[#373F6E] hover:text-white transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 space-y-4">
                            <p className="text-gray-400 font-bold">No other courses enrolled.</p>
                            <button
                                onClick={() => navigate("/courses")}
                                className="px-8 py-3 rounded-xl bg-[#373F6E] text-white font-black text-lg uppercase tracking-widest hover:bg-[#2d3454] transition-all shadow-lg"
                            >
                                Browse More Courses
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) {
    return (
        <div className={`bg-white p-6 rounded-3xl border ${color} shadow-sm flex items-center gap-4`}>
            <div className="p-3 rounded-2xl bg-gray-50">{icon}</div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black text-[#1a1a1a]">{value}</p>
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="text-lg font-bold text-[#373F6E]">{value}</span>
        </div>
    );
}
