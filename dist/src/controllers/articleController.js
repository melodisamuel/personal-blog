"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homepage = homepage;
exports.showArticle = showArticle;
exports.addArticle = addArticle;
const article_1 = require("../models/article");
// interface AuthenticatedRequest extends Request {
//     session: SessionData & { userId?: number };
// }
async function homepage(req, res) {
    try {
        const articles = await (0, article_1.getAllArticles)();
        res.render('home', { articles });
    }
    catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function showArticle(req, res) {
    try {
        const articleId = parseInt(req.params.id, 10);
        if (isNaN(articleId)) {
            res.status(400).send("Invalid article ID");
            return;
        }
        const article = await (0, article_1.getAllArticleById)(articleId);
        if (!article) {
            res.status(404).send("Article not found");
            return;
        }
        res.render("article", { article });
    }
    catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function addArticle(req, res) {
    try {
        const { title, content } = req.body;
        if (!req.session || !req.session.userId) { // ✅ Fix session type
            res.status(403).send('Unauthorized');
            return;
        }
        await (0, article_1.createArticle)(title, content, req.session.userId);
        res.redirect('/');
    }
    catch (error) {
        console.error("Error adding article:", error);
        res.status(500).send("Internal Server Error");
    }
}
