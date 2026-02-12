import { auth } from "../firebase/auth";

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

      console.log(data.isAdmin);

      // Redirect to admin dashboard if user is admin

      if (data.role === "admin") {
        navigate("/adminDashboard");
        return;
      }
      // Redirect based on onboarding status
      else if (data.onboarded && data.selectedCourse) {
        navigate(`/journey/${data.selectedCourse}`);
      } else if (data.onboarded) {
        // Fallback to courses page if no selected course
        navigate("/courses");
      } else {
        navigate("/onboarding");
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();

      // Get current logged-in user
      const user = auth.currentUser;
      const token = await user?.getIdToken();

      // Check onboarding status
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      alert("Google login successful ✅");

      // Redirect to admin dashboard if user is admin

      if (data.role === "admin") {
        navigate("/adminDashboard");
        return;
      }

      // Redirect based on onboarding status
      else if (data.onboarded && data.selectedCourse) {
        navigate(`/journey/${data.selectedCourse}`);
      } else if (data.onboarded) {
        // Fallback to courses page if no selected course
        navigate("/courses");
      } else {
        navigate("/onboarding");
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-[#8ea2fa] rounded-lg shadow-md p-8">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="bg-[#363e63] text-white rounded-lg w-full p-2.5"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="bg-[#363e63] text-white rounded-lg w-full p-2.5"
          />

          <button
            type="submit"
            className="bg-[#363e63] text-white rounded-lg w-full p-2.5"
          >
            Login
          </button>

          <p className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600">Sign up</Link>
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 rounded-lg py-2.5"
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>

        </form>
      </div>
    </div>
  );
}
