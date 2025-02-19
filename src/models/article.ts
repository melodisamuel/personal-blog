import pool from '../../config/db';

export interface Article {
    id?: number;
    title: string;
    content: string;
    author_id: number;
    created_at?: Date;
}

// Fetch all articles 
export async function getAllArticles(): Promise<Article[]> {
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    return rows as Article[];
}

// Get a single article 
export async function getAllArticleById(id: number): Promise<Article | null> {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    const articles = rows as Article[];
    return articles.length > 0 ? articles[0] : null;
}

// Create a new article 
export async function createArticle(title: string, content: string, author_id: number): Promise<void> {
    await pool.query('INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)', [title, content, author_id]);
}