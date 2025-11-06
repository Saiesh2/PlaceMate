import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Home,
  Briefcase,
  Users,
  FileText,
  Video,
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
  ChevronRight,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const NAVBAR_HEIGHT = 70;

const Navbar = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dracula" : "lemonade";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    window.addEventListener("scroll", handleScroll);
    document.body.style.paddingTop = `${NAVBAR_HEIGHT}px`;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.paddingTop = "0";
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "lemonade" ? "dracula" : "lemonade";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogoClick = () => {
    navigate(authUser ? "/user" : "/");
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login"; // force reload to ensure store resets UI
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 py-3 transition-all duration-300 ${
        scrolled ? "bg-slate-500 dark:bg-gray-900/90 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`} style={{ height: `${NAVBAR_HEIGHT}px` }}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-clip-text">PlaceMate</span>
            <span className="hidden md:inline px-2 py-1 text-xs font-semibold bg-primary/10 rounded-full ml-2">
              Student Edition
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={isActive("/")}>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            {!authUser && (
              <>
                <NavLink to="/placements" active={isActive("/placements")}>
                  <Briefcase size={18} />
                  <span>Placements</span>
                </NavLink>
                <NavLink to="/interviews" active={isActive("/interviews")}>
                  <Video size={18} />
                  <span>Interviews</span>
                </NavLink>
                <NavLink to="/goalsdemo" active={isActive("/goalsdemo")}>
                  <Users size={18} />
                  <span>Goal Tracker</span>
                </NavLink>
                <NavLink to="/resume-demo" active={isActive("/resume-demo")}>
                  <FileText size={18} />
                  <span>Resume Demo</span>
                </NavLink>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full" aria-label="Toggle Theme">
              {theme === "dracula" ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
            </button>

            {/* Auth buttons or user dropdown */}
            {!authUser ? (
              <>
                <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/90">
                  <LogIn size={18} />
                  <span>Log In</span>
                </Link>
                <Link to="/signup" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90">
                  <UserPlus size={18} />
                  <span className="hidden md:inline">Sign Up</span>
                </Link>
              </>
            ) : (
              <div className="relative" onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
                <button className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                    <img src={authUser.profilePic || "/api/placeholder/100/100"} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-medium line-clamp-1">{authUser.fullName || "User"}</p>
                    <p className="text-xs text-muted-foreground">{authUser.email || "user@example.com"}</p>
                  </div>
                </button>

                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium">{authUser.fullName || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{authUser.email || "user@example.com"}</p>
                    </div>
                    <UserMenuItem to="/profile" icon={<User size={16} />} text="My Profile" />
                    <UserMenuItem to="/settings" icon={<Settings size={16} />} text="Settings" />
                    <div className="border-t my-1"></div>
                    <button onClick={handleLogout} className="w-full text-left">
                      <UserMenuItem to="#" icon={<LogOut size={16} />} text="Log Out" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger for mobile */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-muted/80">
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="py-2">
              {!authUser && (
                <div className="p-4 flex flex-col gap-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-2 border text-primary rounded-md">
                    <LogIn size={18} />
                    Log In
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </div>
              )}

              <MobileMenuItem to="/" text="Home" icon={<Home size={18} />} isActive={isActive("/")} onClick={() => setIsMenuOpen(false)} />
              {!authUser && (
                <>
                  <MobileMenuItem to="/placements" text="Placements" icon={<Briefcase size={18} />} isActive={isActive("/placements")} onClick={() => setIsMenuOpen(false)} />
                  <MobileMenuItem to="/interviews" text="Interviews" icon={<Video size={18} />} isActive={isActive("/interviews")} onClick={() => setIsMenuOpen(false)} />
                  <MobileMenuItem to="/goalsdemo" text="Goal Tracker" icon={<Users size={18} />} isActive={isActive("/goalsdemo")} onClick={() => setIsMenuOpen(false)} />
                  <MobileMenuItem to="/resume-demo" text="Resume Demo" icon={<FileText size={18} />} isActive={isActive("/resume-demo")} onClick={() => setIsMenuOpen(false)} />
                </>
              )}

              {authUser && (
                <>
                  <div className="border-t my-2" />
                  <MobileMenuItem to="/profile" text="My Profile" icon={<User size={18} />} isActive={isActive("/profile")} onClick={() => setIsMenuOpen(false)} />
                  <MobileMenuItem to="/settings" text="Settings" icon={<Settings size={18} />} isActive={isActive("/settings")} onClick={() => setIsMenuOpen(false)} />
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left">
                    <MobileMenuItem to="#" text="Log Out" icon={<LogOut size={18} />} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavLink = ({ to, active, children }) => (
  <Link to={to} className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
    active ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/80"
  }`}>
    {children}
  </Link>
);

const UserMenuItem = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted/80">
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileMenuItem = ({ to, icon, text, isActive, onClick }) => (
  <Link to={to} onClick={onClick} className={`flex items-center justify-between px-4 py-3 mx-2 rounded-lg ${
    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/80"
  }`}>
    <div className="flex items-center gap-3">{icon}<span>{text}</span></div>
    <ChevronRight size={16} className={isActive ? "text-primary" : "text-muted-foreground"} />
  </Link>
);

export default Navbar;
