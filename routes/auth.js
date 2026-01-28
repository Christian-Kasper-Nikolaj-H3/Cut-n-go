import { Router } from 'express';
import models from '../db/models.js';
import bcryptjs from 'bcryptjs';


const router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json({status: 'Bad request'});
    }
    let checkUser = await models.user.findOne({where:{username:username}});
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

})

export default router;