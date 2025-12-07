import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, logout, user } = useContext(AuthContext);

  // active nav link UI highlight
  const [active, setActive] = useState("home");

  // update active state when route changes
  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setActive("dashboard");
    } else if (location.pathname === "/") {
      setActive("home");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();          // clears context + localStorage
    navigate("/login");
  };

  const NavItem = ({ label, to }) => (
    <Link
      to={to}
      onClick={() => setActive(label)}
      className={`
        relative px-3 py-1 text-sm capitalize font-bold tracking-widest transition-all 
        ${active === label ? "text-emerald-400" : "text-slate-300 hover:text-indigo-400"}
      `}
    >
      {label}
      {active === label && (
        <span className="absolute left-0 right-0 mx-auto -bottom-1 h-[3px] w-5 
                         bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 
                         animate-[pulse_1.6s_ease-in-out_infinite] rounded-full shadow-[0_0_10px_#4f46e5]">
        </span>
      )}
    </Link>
  );

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-slate-900/80 backdrop-blur-2xl shadow-[0_0_20px_#00ffaa33]
        border-b border-indigo-500/20
        animate-[breath_6s_ease-in-out_infinite]
      "
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="
          text-3xl font-black drop-shadow-[0_0_15px_rgba(0,255,180,0.6)] 
          bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 
          text-transparent bg-clip-text animate-[pulse_2.8s_infinite]
        ">
          DQuizz
        </h1>

        <div className="flex gap-10 text-lg">
          <NavItem label="home" to="/" />

          {isLoggedIn && user?.role === "admin" && (
            <NavItem label="dashboard" to="/admin-dashboard" />
          )}

          {isLoggedIn && user?.role === "student" && (
            <NavItem label="dashboard" to="/student-dashboard" />
          )}
        </div>

        {/* BUTTON SECTION */}
        <div className="flex gap-4">

          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="
                  px-5 py-2 rounded-lg text-white font-bold
                  bg-gradient-to-br from-slate-800 via-indigo-600 to-emerald-500
                  hover:shadow-[0_0_18px_#00ffcc] hover:scale-[1.04]
                  transition-all duration-300
                ">
                  Sign In
                </button>
              </Link>

              <Link to="/">
                <button className="
                  px-5 py-2 rounded-lg text-black font-bold
                  bg-gradient-to-r from-emerald-400 to-indigo-400
                  hover:shadow-[0_0_25px_#22ffdd] hover:scale-[1.05]
                  transition-all duration-300
                ">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="
                px-5 py-2 rounded-lg font-bold text-white
                bg-gradient-to-br from-red-500 via-red-600 to-red-700
                hover:shadow-[0_0_20px_#ff4444] hover:scale-[1.05]
                transition-all duration-300
              "
            >
              Logout
            </button>
          )}
        </div>

      </nav>
    </header>
  );
}
