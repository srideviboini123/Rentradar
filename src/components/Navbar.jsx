
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    function handleLogout() {
        logout();
        closeMenu();
        navigate("/login");
    }

    const dashboardPath =
        user?.role?.toLowerCase() === "owner" ||
        user?.role?.toLowerCase() === "property owner"
            ? "/owner-dashboard"
            : "/tenant-dashboard";

    return (
        <nav className="navbar">

            {/* Website Logo */}
            <Link
                to="/"
                className="navbar-logo"
                onClick={closeMenu}
            >
                <span className="logo-icon">R</span>
                <span>RentRadar</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            {/* Navigation Links */}
            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>

                <NavLink to="/" end onClick={closeMenu}>
                    Home
                </NavLink>

                <NavLink to="/properties" onClick={closeMenu}>
                    Properties
                </NavLink>

                <NavLink to="/compare" onClick={closeMenu}>
                    Compare
                </NavLink>

                <NavLink to="/saved" onClick={closeMenu}>
                    Saved
                </NavLink>

            </div>

            {/* Authentication Buttons */}
            <div className={`navbar-actions ${menuOpen ? "open" : ""}`}>

                {isAuthenticated ? (
                    <>
                        <span className="navbar-user">
                            Hi, {user.name}
                        </span>

                        <Link
                            to={dashboardPath}
                            className="navbar-button"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="navbar-logout"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="navbar-login"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="navbar-button"
                            onClick={closeMenu}
                        >
                            Register
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;



