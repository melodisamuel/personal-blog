import { Request, Response } from 'express';
import { getAllArticles, getAllArticleById, createArticle } from '../models/article';

export async function homepage(req: Request, res: Response) {
    const articles = await getAllArticles();
    res.render('home', { articles });
}

export async function showArticle(req: Request, res: Response) {
    const article = await getAllArticleById(Number(req.params.id));
    if(!article) return res.status(404).send('Article not found');
    res.render('article', { article });
}

export async function addArticle(req: Request, res: Response) {
    const { title, content } = req.body;
    if(!req.session.userId) return res.status(403).send('Unauthorized');
    await createArticle(title, content, req.session.userId);
    res.redirect('/');
}