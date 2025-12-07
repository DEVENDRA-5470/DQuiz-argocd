import { motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function StudentDashboard() {
  const { logout } = useContext(AuthContext);
const navigate = useNavigate();

function handleLogout() {
  logout();           // clears context + localStorage
  navigate("/login"); // redirect user
}


  const [pos, setPos] = useState({x:0,y:0});
  const move = e => setPos({
    x:(e.clientX / window.innerWidth - 0.5)*15,
    y:(e.clientY / window.innerHeight - 0.5)*15,
  });

  return (
    <div onMouseMove={move}
         className="min-h-screen flex bg-[#0a0f15] text-white relative overflow-hidden select-none pt-[75px]">

      {/* BACKGROUND GLOW LAYERS */}
      <motion.div animate={{opacity:[0.25,0.4,0.25],scale:[1,1.1,1]}}
                  transition={{duration:14,repeat:Infinity}}
                  className="absolute w-[40rem] h-[40rem] top-0 left-0 blur-[140px]
                             bg-gradient-to-br from-cyan-400 to-blue-400 opacity-30"
                  style={{x:pos.x*-3,y:pos.y*-3}}/>
      
      <motion.div animate={{opacity:[0.2,0.35,0.2],scale:[1.05,1.2,1.05]}}
                  transition={{duration:15,repeat:Infinity}}
                  className="absolute w-[43rem] h-[43rem] bottom-0 right-0 blur-[160px]
                             bg-gradient-to-tl from-teal-300 to-emerald-400 opacity-25"
                  style={{x:pos.x*3,y:pos.y*3}}/>


      {/* LEFT SIDEBAR — SOFTER FOR STUDENTS */}
      <aside className="
        w-60 h-screen p-8 sticky top-0 backdrop-blur-xl bg-white/5
        border-r border-white/10 shadow-[0_0_35px_rgba(120,255,255,0.18)]
      ">
        <h2 className="text-2xl font-bold mb-8
                       bg-gradient-to-r from-cyan-300 to-emerald-300
                       text-transparent bg-clip-text">
          Student Panel
        </h2>

        <nav className="space-y-4 font-medium text-gray-300">
          <a className="block px-3 py-2 rounded-lg bg-white/10">Dashboard</a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer">Available Quizzes</a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer">My Attempts</a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer">Profile</a>
      <a 
  onClick={handleLogout}
  className="block px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer text-red-300"
>
  Logout
</a>

        </nav>
      </aside>




      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10 space-y-10">

        {/* HEADER */}
        <motion.h1 style={{x:pos.x*.9,y:pos.y*.9}}
                   className="text-4xl font-extrabold 
                              bg-gradient-to-r from-cyan-300 to-emerald-300 
                              text-transparent bg-clip-text">
          Welcome Student
        </motion.h1>


        {/* STATS — CLEAN FRIENDLY VISUAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div whileHover={{scale:1.05}}
                      className="p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
            <div className="text-5xl font-bold text-cyan-300">5</div>
            <p className="text-gray-300 mt-2">Quizzes Available</p>
          </motion.div>

          <motion.div whileHover={{scale:1.05}}
                      className="p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
            <div className="text-5xl font-bold text-emerald-300">3</div>
            <p className="text-gray-300 mt-2">Attempts Done</p>
          </motion.div>

          <motion.div whileHover={{scale:1.05}}
                      className="p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
            <div className="text-5xl font-bold text-purple-300">72%</div>
            <p className="text-gray-300 mt-2">Avg Score</p>
          </motion.div>
        </div>



        {/* QUIZ LIST BLOCK */}
        <section className="mt-8">
          <h2 className="text-2xl mb-4 font-semibold text-cyan-300">Available Quizzes</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* repeated cards — future dynamic */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
                            border border-white/10 hover:scale-[1.03] transition">
              <h3 className="text-xl font-bold">JavaScript Basics</h3>
              <p className="text-sm text-gray-300 mt-2">Duration: 30 mins</p>
              <button className="mt-4 px-5 py-2 rounded-lg font-semibold text-black 
                                 bg-gradient-to-r from-cyan-300 to-emerald-300
                                 shadow-[0_0_25px_rgba(100,255,255,0.25)]
                                 hover:shadow-[0_0_45px_rgba(100,255,255,0.35)]
                                 transition-all duration-300">
                Start Quiz
              </button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
