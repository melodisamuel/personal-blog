"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArticles = getAllArticles;
exports.getAllArticleById = getAllArticleById;
exports.createArticle = createArticle;
const db_1 = __importDefault(require("../../config/db"));
// Fetch all articles 
async function getAllArticles() {
    const [rows] = await db_1.default.query('SELECT * FROM articles ORDER BY created_at DESC');
    return rows;
}
// Get a single article 
async function getAllArticleById(id) {
    const [rows] = await db_1.default.query('SELECT * FROM articles WHERE id = ?', [id]);
    const articles = rows;
    return articles.length > 0 ? articles[0] : null;
}
// Create a new article 
async function createArticle(title, content, author_id) {
    await db_1.default.query('INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)', [title, content, author_id]);
}
