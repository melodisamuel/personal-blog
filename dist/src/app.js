"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(userRoutes_1.default);
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
