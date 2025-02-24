import express from 'express';
import { homepage, showArticle, addArticle,  } from "../controllers/articleController";

const router = express.Router();

router.get('/', homepage);
router.get('/article/:id', showArticle);
router.post('/article', addArticle);

export default router

