"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = findUserByUsername;
exports.createUser = createUser;
const db_1 = __importDefault(require("../../config/db"));
// Find a user by username
async function findUserByUsername(username) {
    const [rows] = await db_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
    const users = rows;
    return users.length > 0 ? users[0] : null;
}
// Create a new user
async function createUser(username, password) {
    await db_1.default.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
}
