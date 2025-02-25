import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import routes from './routes/userRoutes';
import path from 'path';

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: false }));
app.use(routes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));