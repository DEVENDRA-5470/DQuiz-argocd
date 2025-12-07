import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

export default function Dashboard() {
  const [students, setStudents] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [quizzes, setQuizzes] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const s = await api.get("/admin/student-count");
      setStudents(s.data.count);

      // We will fill these later:
      // const qz = await axios.get("/api/admin/quiz-count");
      // setQuizzes(qz.data.count);

      // const qs = await axios.get("/api/admin/question-count");
      // setQuestions(qs.data.count);
    } catch (err) {
      console.log("Error fetching dashboard stats", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white flex pt-[75px]">
      {/* SIDEBAR */}
      <aside className="w-72 h-screen p-8 space-y-8 sticky top-0 bg-white/5 border-r border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(120,200,255,0.15)]">
        <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-sky-300 to-emerald-300 text-transparent bg-clip-text">
          DQuiz Admin
        </h2>
        <nav className="space-y-4 font-medium">
          <a className="block px-3 py-2 rounded-lg bg-gradient-to-r from-sky-300/30 to-emerald-300/30">
            Dashboard
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
            Create Quiz
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
            Manage Questions
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
            Students Activity
          </a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-sky-300 to-emerald-300 text-transparent bg-clip-text">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow hover:scale-[1.03] transition duration-500">
            <div className="text-5xl font-bold text-sky-300">{quizzes}</div>
            <p className="text-gray-300 mt-2">Total Quizzes</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow hover:scale-[1.03] transition duration-500">
            <div className="text-5xl font-bold text-emerald-300">
              {questions}
            </div>
            <p className="text-gray-300 mt-2">Questions Added</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow hover:scale-[1.03] transition duration-500">
            <div className="text-5xl font-bold text-purple-300">{students}</div>
            <p className="text-gray-300 mt-2">Active Students</p>
          </div>
        </div>
        <div className="mt-14 p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          {" "}
          <h3 className="text-2xl font-semibold mb-3 text-sky-300">
            Next Up →
          </h3>{" "}
          <ul className="space-y-2 text-gray-300">
            {" "}
            <li>• Create Quiz UI</li> <li>• Add Questions + Options</li>{" "}
            <li>• Timer & Scoring Logic</li>{" "}
            <li>• Student Attempt Dashboard</li>{" "}
          </ul>{" "}
        </div>
      </main>
    </div>
  );
}
