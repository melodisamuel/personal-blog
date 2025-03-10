import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import { getAllArticles, getAllArticleById, createArticle } from '../models/article';

// interface AuthenticatedRequest extends Request {
//     session: SessionData & { userId?: number };
// }
export async function homepage(req: Request, res: Response): Promise<void> {
    try {
        const articles = await getAllArticles();
        res.render('home', { articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function showArticle(req: Request, res: Response): Promise<void> {  // ✅ Add Promise<void>
    try {
        const articleId = parseInt(req.params.id, 10);
        if (isNaN(articleId)) {
            res.status(400).send("Invalid article ID");
            return;
        }

        const article = await getAllArticleById(articleId);
        if (!article) {
            res.status(404).send("Article not found");
            return;
        }

        res.render("article", { article });
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function addArticle(req: Request, res: Response): Promise<void> {  // ✅ Add Promise<void>
    try {
        const { title, content } = req.body;
        if (!req.session || !req.session.userId) {  // ✅ Fix session type
            res.status(403).send('Unauthorized');
            return;
        }

        await createArticle(title, content, req.session.userId);
        res.redirect('/');
    } catch (error) {
        console.error("Error adding article:", error);
        res.status(500).send("Internal Server Error");
    }
}
