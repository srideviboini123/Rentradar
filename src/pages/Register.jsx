
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Register() {

    const navigate = useNavigate();
    const { register } = useAuth();

    // Store form input values
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Handle registration
    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (formData.name.trim().length < 2) {
            setError("Please enter a valid name.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (!formData.role) {
            setError("Please select your role.");
            return;
        }

        try {
            setIsSubmitting(true);

            const result = await register(formData);

            if (!result.success) {
                setError(result.message);
                return;
            }

            // Navigate to Login after successful registration
            navigate("/login", {
                state: {
                    message: "Registration successful! Please login."
                }
            });

        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Create Account</h2>

                <p className="auth-subtitle">
                    Join RentRadar and get started
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password (minimum 8 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Register As</label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select your role
                            </option>

                            <option value="tenant">
                                Tenant
                            </option>

                            <option value="owner">
                                Property Owner
                            </option>
                        </select>
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;

