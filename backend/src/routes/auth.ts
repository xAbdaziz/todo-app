import { Router, Request, Response } from 'express';

import { compare } from 'bcrypt';

import jwt from 'jsonwebtoken';

import usersModel from '../db/usersModel';

const authRouter: Router = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(422).json({ message: "No username/password was provided" })
        }
        const userExists = await usersModel.exists({ username: username })
        if (userExists) {
            return res.status(409).json({ message: "User already exists." });
        }
        await usersModel.create({
            username: username,
            password: password,
        });
        return res.status(201).json({ message: "User created." });
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(422).json({ message: "No username/password was provided" })
        }
        const userExists = await usersModel.findOne({ username: username })
        if (!userExists) {
            return res.status(404).json({ message: "User doesn't exists" });
        }
        compare(password, userExists.password, (err, correctPassword) => {
            if (err) {
                return res.status(500).json({ message: "Internal Server Error" })
            }

            if (!correctPassword) {
                return res.status(401).json({ message: "Invalid credentials" })
            }

            const token = jwt.sign({ username: userExists.username },
                process.env.JWT_SECRET || '',
                { expiresIn: "1h" });
            return res.json({ token })

        })
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default authRouter
