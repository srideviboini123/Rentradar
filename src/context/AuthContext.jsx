
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Custom Hook
export function useAuth() {
    return useContext(AuthContext);
}

// Password hashing for this frontend demo
async function hashPassword(password, salt) {
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: encoder.encode(salt),
            iterations: 100000,
            hash: "SHA-256"
        },
        key,
        256
    );

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// Authenticate function
async function authenticate(email, password) {
    const users = JSON.parse(
        localStorage.getItem("rentRadarUsers") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
        user => user.email === normalizedEmail
    );

    if (!existingUser) {
        return null;
    }

    const enteredHash = await hashPassword(
        password,
        existingUser.salt
    );

    if (enteredHash !== existingUser.passwordHash) {
        return null;
    }

    return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
    };
}

// Auth Provider
export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("rentRadarUser");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const isAuthenticated = user !== null;

    // Register function
    async function register(userData) {
        const users = JSON.parse(
            localStorage.getItem("rentRadarUsers") || "[]"
        );

        const email = userData.email.trim().toLowerCase();

        const existingUser = users.find(
            savedUser => savedUser.email === email
        );

        if (existingUser) {
            return {
                success: false,
                message: "This email is already registered."
            };
        }

        const salt = crypto.randomUUID();

        const passwordHash = await hashPassword(
            userData.password,
            salt
        );

        const newUser = {
            id: crypto.randomUUID(),
            name: userData.name.trim(),
            email,
            role: userData.role,
            salt,
            passwordHash
        };

        users.push(newUser);

        localStorage.setItem(
            "rentRadarUsers",
            JSON.stringify(users)
        );

        return {
            success: true,
            message: "Registration successful!"
        };
    }

    // Login session
    function login(userData) {
        setUser(userData);

        localStorage.setItem(
            "rentRadarUser",
            JSON.stringify(userData)
        );
    }

    // Logout
    function logout() {
        setUser(null);
        localStorage.removeItem("rentRadarUser");
    }

    const value = {
        user,
        isAuthenticated,
        register,
        authenticate,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


