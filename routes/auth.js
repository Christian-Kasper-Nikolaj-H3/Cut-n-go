import { Router } from 'express';
import models from '../db/models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password){
            return res.status(400).json({status: 'Bad request'});
        }
        let checkUser = await models.Users.findOne({ where: {username:username} });
        if (!checkUser){
            return res.status(401).json({status: 'Unauthorized'});
        }
        let checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword){
            return res.status(401).json({status: 'Unauthorized'});
        }
        const token = jwt.sign(
            { id: checkUser.id, username: checkUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({success: true, token: token});

    } catch (e) {
        console.error(e.message);
        return res.status(500).json({status: 'Internal server error'});
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({status: 'Bad request'});
        }

        const doesUserExist = await models.Users.findOne({ where: { username }});
        if(doesUserExist){
            return res.status(409).json({status: 'Conflict'});
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = await models.Users.create({username, password: hashedPassword});

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(201).json({status: 'Created', token: token});
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({status: 'Internal server error'});
    }
});

export default router;