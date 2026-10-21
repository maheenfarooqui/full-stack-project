import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const userData = { username, email, password };
      const response = await axios.post("/api/users/register", userData);
await Swal.fire({
        title: "Account Created!",
        text: response.data.message || "Signup successful!",
        icon: "success",
        confirmButtonColor: "#FF94A8",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-5 bg-[#FFF0F4] text-[#5A3E36]">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/94/74/58/9474588499f690a868a7fd252fe09fb9.jpg')",
        }}
      />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-gradient-to-br from-[#FFF5F6]/95 via-[#FFEBF0]/95 to-[#FFD8E4]/95 backdrop-blur-md border border-[#F3B0C3]/70 shadow-xl rounded-sm">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#6D4236]">
            ✨ {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>

          <p className="mt-3 text-sm text-[#8A5A4D]">
            {isLogin
              ? "Login to continue to your account"
              : "Sign up to get started with your tasks"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-[#8A5A4D]">
                Full username
              </label>

              <input
                type="text"
                username="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/80 border border-[#F3B0C3] rounded-sm focus:ring-2 focus:ring-[#FFB6C1] focus:outline-none"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-[#8A5A4D]">
              Email Address
            </label>

            <input
              type="email"
              username="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/80 border border-[#F3B0C3] rounded-sm focus:ring-2 focus:ring-[#FFB6C1] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-[#8A5A4D]">
              Password
            </label>

            <input
              type="password"
              username="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/80 border border-[#F3B0C3] rounded-sm focus:ring-2 focus:ring-[#FFB6C1] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FFB6C1] to-[#FF94A8] text-white font-bold py-3 px-4 rounded-sm hover:opacity-90 transition-all cursor-pointer"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Toggle Login / Signup */}
        <div className="mt-7 text-center text-sm text-[#8A5A4D]">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-bold text-[#C45B78] hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-bold text-[#C45B78] hover:underline cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
