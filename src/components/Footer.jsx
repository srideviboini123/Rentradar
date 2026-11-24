
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Brand Section */}
                <div className="footer-brand">

                    <Link to="/" className="footer-logo">
                        RentRadar<span>.</span>
                    </Link>

                    <p>
                        Find your perfect rental home with ease.
                        Explore beautiful houses and apartments
                        that match your lifestyle and budget.
                    </p>

                    <div className="footer-socials">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                    </div>

                </div>

                {/* Quick Links */}
                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/compare">Compare</Link>
                    <Link to="/saved">Saved Properties</Link>

                </div>

                {/* Account Links */}
                <div className="footer-links">

                    <h3>Account</h3>

                    <Link to="/login">Login</Link>
                    <Link to="/register">Create Account</Link>
                    <Link to="/tenant-dashboard">Tenant Dashboard</Link>
                    <Link to="/owner-dashboard">Owner Dashboard</Link>

                </div>

                {/* Contact Section */}
                <div className="footer-contact">

                    <h3>Contact Us</h3>

                    <p>📍 Hyderabad, Telangana, India</p>
                    <p>✉️ support@rentradar.example</p>
                    <p>🏠 Find Your Perfect Rental Home</p>

                </div>

            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} RentRadar.
                    All rights reserved.
                </p>

                <p>Made with care for better home searching.</p>

            </div>

        </footer>
    );
}

export default Footer;
