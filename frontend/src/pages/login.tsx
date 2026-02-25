import { auth } from "../firebase/auth";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../firebase/auth";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await loginWithEmail(email, password);

      // Get current logged-in user
      const user = auth.currentUser;

      // Get Firebase ID token
      const token = await user?.getIdToken();

      // Send token to backend to get profile
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      alert("Login successful ✅");

      // Redirect to admin dashboard if user is admin
      if (data.role === "admin") {
        navigate("/adminDashboard");
        return;
      }
      // Redirect based on onboarding status
      else if (data.onboarded && data.selectedCourse) {
        navigate(`/journey/${data.selectedCourse}`);
      } else if (data.onboarded) {
        navigate("/courses");
      } else {
        navigate("/onboarding");
      }
    } catch (err: any) {
      console.error("Firebase Auth Error Full:", err);
      // Firebase errors usually have a code like 'auth/wrong-password'
      if (err.code === "auth/invalid-credential") {
        alert("Invalid email or password.");
      } else if (err.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert(err.message);
      }
    }
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();

      const user = auth.currentUser;
      const token = await user?.getIdToken();

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert("Google login successful ✅");

      if (data.role === "admin") {
        navigate("/adminDashboard");
        return;
      } else if (data.onboarded && data.selectedCourse) {
        navigate(`/journey/${data.selectedCourse}`);
      } else if (data.onboarded) {
        navigate("/courses");
      } else {
        navigate("/onboarding");
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-white">
      {/* Main Content Container */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-20 py-10 my-auto">

        {/* Left Side - Welcome Text */}
        <div className="flex-1 max-w-xl text-center md:text-left space-y-3 font-['Bebas_Neue']">
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] uppercase tracking-wider leading-[0.85]">
            WELCOME
          </h1>
          <p className="text-base md:text-lg font-semibold text-[#1a1a1a] leading-tight max-w-md opacity-90 font-sans tracking-normal">
            Log in to access your dashboard, continue learning, and manage your courses. Enter your credentials to get started.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-lg bg-[#9ca6ea] rounded-[3.5rem] p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 font-sans">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-4 rounded-xl bg-[#363e63] text-white placeholder:text-gray-400 border-none outline-none text-base font-medium"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1 font-bold">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-4 rounded-xl bg-[#363e63] text-white placeholder:text-gray-400 border-none outline-none text-base font-medium"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1 font-bold">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between text-white text-sm font-bold px-1 font-sans">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-[#363e63] border-none" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" title="Forgot password" className="hover:underline opacity-90">
                Forgot password?
              </Link>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full p-4 rounded-xl bg-[#363e63] text-white font-black text-2xl uppercase tracking-widest hover:bg-[#2d3454] transition-all shadow-md font-['Bebas_Neue']"
              >
                LOGIN
              </button>

              <div className="text-center">
                <p className="text-white text-base font-bold">
                  Don't have an account?{" "}
                  <Link to="/signup" className="hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full p-3 rounded-2xl bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                <FcGoogle size={44} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
