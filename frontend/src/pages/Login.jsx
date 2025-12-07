import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const { login } = useContext(AuthContext);   // ★ IMPORT LOGIN CONTEXT

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    setPos({ x, y });
  };

  const debug = (label, data) =>
    console.log(`%c[${label}] =>`, "color:#00e1ff;font-weight:bold;", data);


  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    setError(false);
    setErrorMsg("");

    try {
      debug("STEP-3 Sending Login Request", { email, password });

      const res = await api.post("/auth/login", { email, password });
      debug("STEP-4 Backend Response", res.data);

      // ★★ AUTH FIX: USE CONTEXT LOGIN() ★★
      login({
        token: res.data.token,
        role: res.data.role,
        email: res.data.email,
      });

      debug("STEP-5 LOGIN STORED IN CONTEXT", res.data);

      const redirect = location.state?.from ?? res.data.redirect;
      debug("STEP-6 Redirecting →", redirect);

      navigate(redirect);
      return;

    } catch (err) {
      debug("STEP-LOGIN FAILED", err.response?.data);
      setError(true);
      setErrorMsg(err.response?.data?.message || "Invalid email or password");
      setTimeout(() => setError(false), 700);
    }
  };

  return (
    <div
      onMouseMove={handleMove}
      className="min-h-screen flex items-center justify-center bg-[#0a0e14] text-white relative overflow-hidden select-none"
    >

      {/* UI BELOW — UNTOUCHED */}
      {/* BACKGROUND LEFT */}
      <motion.div
        animate={{ opacity: [0.28, 0.4, 0.28], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute w-[38rem] h-[38rem] top-10 left-0 
                    bg-gradient-to-br from-indigo-500 to-blue-500
                    blur-[160px]"
        style={{ x: pos.x * -3.5, y: pos.y * -3.5 }}
      />

      {/* BACKGROUND RIGHT */}
      <motion.div
        animate={{ opacity: [0.22, 0.35, 0.22], scale: [1.06, 1.2, 1.06] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute w-[40rem] h-[40rem] bottom-0 right-0
                    bg-gradient-to-tl from-emerald-400 to-cyan-300 
                    blur-[170px]"
        style={{ x: pos.x * 3.5, y: pos.y * 3.5 }}
      />

      {/* ========== LOGIN CARD ========== */}
      <motion.div
        animate={error ? { x: [-10,10,-10,10,0] } : {}}
        transition={{ duration: 0.4 }}
        style={{ x: pos.x * 1.3, y: pos.y * 1.3 }}
        className={`
          relative w-full max-w-md p-10 rounded-3xl
          bg-white/10 backdrop-blur-2xl border
          shadow-[0_0_55px_rgba(150,220,255,0.20)]
          hover:shadow-[0_0_80px_rgba(150,220,255,0.32)]
          transition-all duration-500
          ${error ? "border-red-400 shadow-[0_0_65px_rgba(255,70,70,0.5)]" : "border-white/20"}
        `}
      >
        
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-400 text-center mb-4 font-semibold tracking-wide"
          >
            {errorMsg}
          </motion.div>
        )}

        <h1 className="
          text-center text-4xl font-extrabold mb-9
          bg-gradient-to-r from-sky-300 to-emerald-300
          text-transparent bg-clip-text tracking-wide
        ">Welcome Back</h1>

        <form onSubmit={handleLogin} className="space-y-6 font-medium">

          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="
              w-full p-3 rounded-xl bg-white/10 border border-white/15 text-gray-200
              placeholder-gray-400 focus:ring-2 focus:ring-sky-400 transition-all duration-300
            "
            required
          />

          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="
              w-full p-3 rounded-xl bg-white/10 border border-white/15 text-gray-200
              placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 transition duration-300
            "
            required
          />

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl text-lg font-semibold text-black
              bg-gradient-to-r from-sky-300 to-emerald-300
              shadow-[0_0_45px_rgba(80,210,255,0.25)]
              hover:shadow-[0_0_68px_rgba(80,210,255,0.32)]
              transition-all duration-300
            ">Login</button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?
          <span className="text-sky-300 ml-1 cursor-pointer hover:underline">Register Now</span>
        </p>

      </motion.div>
    </div>
  );
}
