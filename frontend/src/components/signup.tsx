import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupWithEmail, loginWithGoogle } from "../firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signupWithEmail(email, password);
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleGoogleSignup() {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#8ea2fa] rounded-lg p-8">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create new account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2.5 rounded-lg"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2.5 rounded-lg"
          />

          <button type="submit" className="w-full p-2.5 rounded-lg bg-[#363e63] text-white">
            Sign up
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">Sign in</Link>
          </p>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full p-2.5 rounded-lg bg-gray-100"
          >
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
