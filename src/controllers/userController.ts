import { Request, Response } from 'express';
import { creatUser, findUserByUsername } from '../models/user'; 
import bcrypt from 'bcryptjs';

// Register a new user 
export async function registerUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const existingUser = await findUserByUsername(username);

    if(existingUser) {
        return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await creatUser(username, hashedPassword);
    res.redirect('/login')
    }


// Login User 
export async function loginUser(req: Request, res: Response) {
    const { usernmae, password } = req.body;
    const user = await findUserByUsername(usernmae);

    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    req.session.userId = user.id;
    res.redirect('/');
}
