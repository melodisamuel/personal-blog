import pool from '../../config/db';

export interface Comment {
    id?: number;
    content: string;
    article_id: number;
    user_id: number;
    created_at?: Date;
};

// Fetch comments for an article 
export async function getCommentsByArticlesId(article_id: number): Promise<Comment[]> {
    const [rows] = await pool.query('SELECT * FROM comments WHERE article_id = ? ORDER BY created_at DESC', [article_id]);
    return rows as Comment[];
}

// Create a new comment 
export async function createComment(content: string, article_id: number, user_id: number): Promise<void> {
    await pool.query('INSERT INTO comments (content, article_id, user_id) VALUES (?, ?, ?)', [content, article_id, user_id]);
}