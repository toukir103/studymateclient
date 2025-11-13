// src/components/Navbar.jsx
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { auth } from "../../firebase/firebase.config";

// 🔹 Profile Dropdown Component
const ProfileDropdown = ({ user, handleLogout, dark }) => (
  <div className="relative">
    <img
      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}`}
      alt="Profile"
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-600 hover:scale-105 transition-transform"
      onClick={(e) => e.currentTarget.nextSibling.classList.toggle("hidden")}
    />
    <div className={`hidden absolute right-0 mt-3 w-44 rounded-xl py-2 border shadow-xl ${dark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-100 text-gray-700"}`}>
      <p className="px-4 py-2 font-medium border-b">{user.displayName || "User"}</p>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-xl transition-colors"
      >
        Logout
      </button>
    </div>
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success(" Logged out successfully!");
      setMenuOpen(false);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const linkClasses = `hover:text-blue-500 transition-colors`;
  const buttonClasses = `flex items-center gap-2 px-3 py-2 rounded-lg border font-medium transition-transform hover:scale-105 ${dark ? "border-gray-400 text-gray-200" : "border-gray-600 text-gray-700"}`;

  const authLinks = !user ? (
    <Link
      to="/login"
      onClick={() => setMenuOpen(false)}
      className={`px-4 py-2 rounded-lg ${dark ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-600 text-white hover:bg-blue-700"} transition-transform hover:scale-105`}
    >
      Login / Register
    </Link>
  ) : (
    <>
      <Link to="/create-profile" onClick={() => setMenuOpen(false)} className={linkClasses}>Create Partner Profile</Link>
      <Link to="/connections" onClick={() => setMenuOpen(false)} className={linkClasses}>My Connections</Link>
      <ProfileDropdown user={user} handleLogout={handleLogout} dark={dark} />
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-opacity-90 ${dark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"} transition-colors`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`text-2xl font-bold ${dark ? "text-blue-400" : "text-blue-600"} hover:scale-105 transition-transform`}>
          StudyMate
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center font-medium">
          <li><Link to="/" className={linkClasses}>Home</Link></li>
          <li><Link to="/partners" className={linkClasses}>Find Partners</Link></li>
          {authLinks}
          {/* Theme Toggle with Icon */}
          <li>
            <button onClick={toggleTheme} className={buttonClasses}>
              {dark ? <Moon size={18} /> : <Sun size={18} />}
              {dark ? "Dark" : "Light"}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className={`md:hidden focus:outline-none ${dark ? "text-gray-200" : "text-gray-700"}`} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden border-t shadow-lg ${dark ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-100 text-gray-700"}`}>
          <ul className="flex flex-col space-y-3 p-4 font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className={linkClasses}>Home</Link></li>
            <li><Link to="/partners" onClick={() => setMenuOpen(false)} className={linkClasses}>Find Partners</Link></li>
            {authLinks}
            <li>
              <button onClick={toggleTheme} className={buttonClasses}>
                {dark ? <Moon size={18} /> : <Sun size={18} />}
                {dark ? "Dark" : "Light"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
