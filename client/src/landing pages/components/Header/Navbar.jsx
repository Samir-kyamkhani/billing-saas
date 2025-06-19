import { CreditCard, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { label: "features", link: "features" },
    { label: "pricing", link: "pricing" },
    { label: "testimonials", link: "testimonials" },
    { label: "About", link: "about" },
    { label: "Contact Us", link: "contact" },
    // { label: "Login", link: "login" },
    // { label: "Contact Us", link: "contact" },
  ];

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <Link
              style={{ scrollBehavior: "smooth" }}
              href="/#hero"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              BillMaster
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["features", "pricing", "testimonials", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                style={{ scrollBehavior: "smooth" }}
                className="text-slate-600 hover:text-black transition-colors duration-200"
              >
                {item[0].toUpperCase() + item.slice(1)}
              </a>
            ))}
            <Link
              to="/login"
              className="px-4 py-2 text-slate-600 hover:text-black transition-colors duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 transform hover:scale-105"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white min-h-screen flex items-center justify-center px-6 py-10">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-lg justify-end bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center space-y-6 text-center text-2xl md:text-4xl text-slate-900">
            <div className="text-sm text-slate-400">--- &#9679; ---</div>
            {menuItems.map((item, index) => (
              <a
                key={index}
                style={{ scrollBehavior: "smooth" }}
                href={`#${item.link}`}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-purple-600 capitalize transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}

            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl text-slate-800 hover:text-purple-600 transition-colors duration-300"
              aria-label="Sign In"
              to="/login"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full text-lg font-semibold shadow-lg"
              aria-label="Start Free Trial"
            >
              Start Free Trial
            </Link>

            <div className="text-sm text-slate-400">--- &#9679; ---</div>
          </div>
        </div>
      )}
    </nav>
  );
}
