"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const router = express_1.default.Router();
router.get('/', articleController_1.homepage);
router.get('/article/:id', articleController_1.showArticle);
router.post('/article', articleController_1.addArticle);
exports.default = router;
