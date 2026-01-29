import {Router} from 'express';
import models from '../db/models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = Router();

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({status: 'Bad request'});
        }
        let checkUser = await models.Users.findOne({where: {Username: username}});
        if (!checkUser) {
            return res.status(401).json({status: 'Unauthorized'});
        }
        let checkPassword = await bcryptjs.compare(password, checkUser.Password_hash);
        if (!checkPassword) {
            return res.status(401).json({status: 'Unauthorized'});
        }
        const token = jwt.sign(
            {id: checkUser.Id, username: checkUser.Username},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({success: true, token: token});

    } catch (e) {
        console.error(e.message);
        return res.status(500).json({status: 'Internal server error'});
    }
});

router.post('/register', async (req, res) => {
    try {
        const {username, name, surname, password, phone, email} = req.body;

        if (!username || !password || !name || !surname || !phone || !email) {
            return res.status(400).json({status: 'Bad request'});
        }

        const doesUserExist = await models.Users.findOne({where: {Username: username}});
        if (doesUserExist) {
            return res.status(409).json({status: 'Conflict'});
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = await models.Users.create({
            Username: username,
            Password_hash: hashedPassword,
            KundeFornavn: name,
            KundeEfternavn: surname,
            KundeTelefon: phone,
            KundeEmail: email
        });

        const token = jwt.sign(
            {id: newUser.Id, username: newUser.Username},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({status: 'Created', token: token});
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({status: 'Internal server error'});
    }
});

export default router;