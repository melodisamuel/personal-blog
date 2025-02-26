"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
// Register a new user
async function registerUser(req, res) {
    try {
        const { username, password } = req.body;
        // Check if user already exists
        const existingUser = await (0, user_1.findUserByUsername)(username);
        if (existingUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        // Hash password and create user
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await (0, user_1.createUser)(username, hashedPassword);
        // Respond with success message
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("❌ Error in registerUser:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
// Login User
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = await (0, user_1.findUserByUsername)(username);
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Compare password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Store user session
        req.session.userId = user.id;
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
