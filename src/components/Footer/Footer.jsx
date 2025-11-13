import { FaFacebookF, FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <img
              src="/public/footerlogo.jpg"
              alt="StudyMate Logo"
              className="w-8 h-8 object-contain"
            />
            StudyMate
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            StudyMate helps students connect, collaborate, and grow together.
            Learn smart, study together — anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StudyMate. All rights reserved. <br />
        Developed by <span className="text-blue-400 font-medium">Toukir Ahmed Abid</span>
      </div>
    </footer>
  );
};

export default Footer;
