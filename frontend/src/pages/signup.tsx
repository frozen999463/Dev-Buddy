import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupWithEmail, loginWithGoogle } from "../firebase/auth";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({ username, email, password, confirmPassword });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await signupWithEmail(email, password);
      // Note: You might want to update the user profile with the username here
      // await updateProfile(auth.currentUser, { displayName: username });

      navigate("/onboarding");
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleGoogleSignup() {
    try {
      await loginWithGoogle();
      navigate("/onboarding");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-white">
      {/* Main Content Container */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-20 py-10 my-auto">

        {/* Left Side - Promo Text */}
        <div className="flex-1 max-w-xl text-center md:text-left space-y-3 font-['Bebas_Neue']">
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] uppercase tracking-wider leading-[0.85]">
            JOIN US
          </h1>
          <p className="text-base md:text-lg font-semibold text-[#1a1a1a] leading-tight max-w-md opacity-90 font-sans tracking-normal">
            Create an account to start your developer journey. Get access to exclusive courses and tools.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-lg bg-[#9ca6ea] rounded-[3.5rem] p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3 font-sans">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full p-4 rounded-xl bg-[#363e63] text-white placeholder:text-gray-400 border-none outline-none text-base font-medium"
                />
                {errors.username && <p className="text-red-600 text-sm mt-1 font-bold">{errors.username}</p>}
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL"
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

              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="CONFIRM PASSWORD"
                  className="w-full p-4 rounded-xl bg-[#363e63] text-white placeholder:text-gray-400 border-none outline-none text-base font-medium"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1 font-bold">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full p-4 rounded-xl bg-[#363e63] text-white font-black text-2xl uppercase tracking-widest hover:bg-[#2d3454] transition-all shadow-md font-['Bebas_Neue']"
              >
                SIGN UP
              </button>

              <div className="text-center">
                <p className="text-white text-base font-bold">
                  Already have an account?{" "}
                  <Link to="/login" className="hover:underline">
                    Log in
                  </Link>
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
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
