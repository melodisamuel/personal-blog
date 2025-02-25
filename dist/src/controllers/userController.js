"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Register a new user
async function registerUser(req, res) {
    try {
        console.log('Request Body:', req.body); // Debug
        const { username, password } = req.body;
        
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);
        
        res.redirect('/login');
    } catch (error) {
        console.error('Register Error:', error); // Log error
        res.status(500).send('Internal Server Error');
    }
}

// Login User
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await (0, user_1.findUserByUsername)(username);
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).send('Invalid credentials');
            return;
        }
        req.session.userId = user.id; // ✅ No more TS error
        res.redirect('/');
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
