import { sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";

import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Forget Password
  const handleForgetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("📩 Password reset link sent to your email.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("✅ Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
<div className="flex justify-center items-start min-h-screen bg-gray-50 pt-24">

  <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
    <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
      🔐 Login to StudyMate
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="text-right">
        <button
          type="button"
          onClick={handleForgetPassword}
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Divider */}
    <div className="flex items-center my-5">
      <hr className="flex-grow border-gray-300" />
      <span className="px-2 text-gray-500 text-sm">or</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    {/* Google Login */}
    <button
      onClick={handleGoogleLogin}
      className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>

    {/* Register link */}
    <p className="text-center text-sm mt-4 text-gray-600">
      Don’t have an account?{" "}
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
    </p>
  </div>
</div>

  );
};

export default Login;
