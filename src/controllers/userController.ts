import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { findUserByUsername, createUser, User } from "../models/user";

// Register a new user
export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser: User | null = await findUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);

        // Respond with success message
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Error in registerUser:", error);
        res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
    }
}

// Login User
export async function loginUser(req: Request, res: Response): Promise<void> {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user: User | null = await findUserByUsername(username);
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Store user session
        // req.session.userId = user.id;
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
    }
}
