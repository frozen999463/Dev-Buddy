import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth, logout } from "@/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { User } from "lucide-react";

function Header() {
  const [user, setUser] = useState<any>(null);
  const [mongoUser, setMongoUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchHeaderProfile = async () => {
          try {
            const token = await currentUser.getIdToken();
            const response = await fetch("http://localhost:5000/api/profile", {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
              const data = await response.json();
              setMongoUser(data);
            }
          } catch (err) {
            console.error("Error fetching header profile:", err);
          }
        };

        fetchHeaderProfile();

        // Listen for profile updates
        window.addEventListener("profileUpdated", fetchHeaderProfile);
        return () => window.removeEventListener("profileUpdated", fetchHeaderProfile);
      } else {
        setMongoUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to={user ? "/my-courses" : "/home"} className="flex items-center gap-2">
            <img
              src="/images/logodb3@2x.png"
              className="h-60 w-auto"
              alt="DevBuddy Logo"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-base font-bold text-[#1a1a1a]">
          {user && mongoUser?.selectedCourse ? (
            <Link
              to={`/journey/${typeof mongoUser.selectedCourse === 'object' ? mongoUser.selectedCourse._id : mongoUser.selectedCourse}`}
              className="transition-colors hover:text-[#373F6E]"
            >
              Course
            </Link>
          ) : (
            <Link to="/home" className="transition-colors hover:text-[#373F6E]">Home</Link>
          )}
          <Link to="/courses" className="transition-colors hover:text-[#373F6E]">More Courses</Link>
          <Link to="/review" className="transition-colors hover:text-[#373F6E]">Review</Link>
          <Link to="/contact_us" className="transition-colors hover:text-[#373F6E]">Contact us</Link>
          <Link to="/about" className="transition-colors hover:text-[#373F6E]">About us</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-[#373F6E] hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-[#373F6E] overflow-hidden flex items-center justify-center text-white border-2 border-[#373F6E]/10">
                  {mongoUser?.profilePicture ? (
                    <img src={mongoUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <span className="hidden lg:inline font-bold">Profile</span>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-[#f6b26b] hover:bg-[#e6a25b] text-black font-bold rounded-full px-6 py-2 shadow-sm transition-all"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="secondary" size="sm" className="font-semibold hidden sm:flex hover:bg-secondary/80 transition-all duration-300">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild variant="default" size="sm" className="font-semibold">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
