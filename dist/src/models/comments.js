"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByArticlesId = getCommentsByArticlesId;
exports.createComment = createComment;
const db_1 = __importDefault(require("../../config/db"));
;
// Fetch comments for an article 
async function getCommentsByArticlesId(article_id) {
    const [rows] = await db_1.default.query('SELECT * FROM comments WHERE article_id = ? ORDER BY created_at DESC', [article_id]);
    return rows;
}
// Create a new comment 
async function createComment(content, article_id, user_id) {
    await db_1.default.query('INSERT INTO comments (content, article_id, user_id) VALUES (?, ?, ?)', [content, article_id, user_id]);
}
