import { Request, Response } from 'express';
import { createUser, findUserByUsername } from '../models/user';
import bcrypt from 'bcryptjs';
import { Session } from 'express-session';

// Extend Request to include session type
interface AuthenticatedRequest extends Request {
    session: Session & { userId?: number };
}

// Register a new user
export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const { username, password } = req.body;
        const existingUser = await findUserByUsername(username);

        if (existingUser) {
            res.status(400).send('Username already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

// Login User
export async function loginUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const { username, password } = req.body;
        const user = await findUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).send('Invalid credentials');
            return;
        }

        req.session.userId = user.id;  // ✅ No more TS error
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
