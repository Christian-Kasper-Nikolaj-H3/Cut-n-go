import { Router } from 'express';
import {requireAuth} from "../middleware/auth.js";

const router = Router();

router.get('/bookings', requireAuth, async (req, res) => {
    const { id } = req.user;
    if(!id) return res.redirect('/sign-in');


    res.status(200).json({ message: `user id: ${id}`});
});

export default router;