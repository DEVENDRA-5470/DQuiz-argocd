import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// shake animation preset
const shakeVariant = {
  shake: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } }
};

export default function Home() {

  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [errorShake, setErrorShake] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // mouse parallax
  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    setPos({ x, y });
  };

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // FIXED REGISTER LOGIC (do not touch UI)
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", form);

      console.log("REGISTER RESPONSE →", res.data);

      // SUCCESS check for axios
      if (res.data && res.data.userId) {
        alert("Registration Successful!");
        navigate("/login");
        return;
      }

      // If backend returned failure message
      setError(res.data?.message || "Registration failed!");
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);

    } catch (err) {
      console.error("REGISTER ERROR →", err);
      setError("Server Error!");
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  return (
    <div onMouseMove={handleMove}
         className="min-h-screen bg-[#0a0e14] text-white flex items-center justify-center relative overflow-hidden select-none">

      {/* Background clouds */}
      <motion.div animate={{ opacity:[0.3,0.5,0.3], scale:[1,1.14,1] }}
                  transition={{ duration:14, repeat:Infinity }}
                  className="absolute top-10 left-0 w-[40rem] h-[40rem] bg-gradient-to-br from-indigo-500 to-blue-500 blur-[150px]"
                  style={{ x: pos.x * -3, y: pos.y * -3 }}/>

      <motion.div animate={{ opacity:[0.22,0.4,0.22], scale:[1.05,1.18,1.05] }}
                  transition={{ duration:16, repeat:Infinity }}
                  className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-tl from-emerald-400 to-cyan-300 blur-[160px]"
                  style={{ x: pos.x * 3, y: pos.y * 3 }}/>


      {/* HERO + REGISTER GRID */}
      <div className="relative z-10 w-[90%] max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center py-24">

        {/* LEFT HERO */}
        <motion.div style={{ x: pos.x*1.6, y: pos.y*1.6 }}
                    transition={{ type:"spring", mass:0.3 }}
                    className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-sky-300 to-emerald-300 text-transparent bg-clip-text">
              DQuiz Exam System
            </span>
            <br/> Smooth. Smart. Elegant.
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Experience next-gen exams with realtime scoring, timer controls & powerful UI.
          </p>

          <button onClick={() => navigate("/login")}
                  className="px-8 py-3 rounded-xl text-lg font-semibold text-black bg-gradient-to-r from-sky-300 to-emerald-300 shadow-[0_0_40px_rgba(70,200,255,0.25)] hover:shadow-[0_0_60px_rgba(70,200,255,0.35)] transition-all duration-300">
            Get Started →
          </button>
        </motion.div>


        {/* RIGHT — REGISTER CARD */}
        <motion.div variants={shakeVariant}
                    animate={errorShake ? "shake" : ""}
                    style={{ x:pos.x*-1.2, y:pos.y*-1.2 }}
                    transition={{ type:"spring", mass:0.4 }}
                    className={`
                      w-full max-w-md p-8 rounded-2xl backdrop-blur-2xl border
                      transition-all duration-500
                      ${error
                        ? "bg-red-500/10 border-red-300/40 shadow-[0_0_75px_rgba(255,80,80,0.35)]"
                        : "bg-white/10  border-white/20 shadow-[0_0_60px_rgba(120,200,255,0.18)] hover:shadow-[0_0_85px_rgba(120,200,255,0.32)]"}
                    `}
        >

          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-sky-300 to-emerald-300 text-transparent bg-clip-text">
            Register Now
          </h2>

          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-6">
            <input name="name" type="text" placeholder="Full Name"
                   value={form.name} onChange={handleInput}
                   className={`w-full p-3 rounded-xl bg-white/10 border text-gray-200 outline-none ${error ? "border-red-400" : "border-white/15"}`}
                   required/>

            <input name="email" type="email" placeholder="Email"
                   value={form.email} onChange={handleInput}
                   className={`w-full p-3 rounded-xl bg-white/10 border text-gray-200 outline-none ${error ? "border-red-400" : "border-white/15"}`}
                   required/>

            <input name="password" type="password" placeholder="Password"
                   value={form.password} onChange={handleInput}
                   className={`w-full p-3 rounded-xl bg-white/10 border text-gray-200 outline-none ${error ? "border-red-400" : "border-white/15"}`}
                   required/>

            <motion.button whileTap={{ scale:0.97 }}
                           type="submit"
                           className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-sky-300 to-emerald-300 shadow-[0_0_45px_rgba(80,210,255,0.25)] hover:shadow-[0_0_65px_rgba(80,210,255,0.32)] transition">
              Create Account
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
