import { Router } from 'express';
import models from '../db/models.js';

import {requireAuth} from "../middleware/auth.js";

const router = Router();

router.get('/bookings', requireAuth, async (req, res) => {
    const { id } = req.user;
    if(!id) return res.status(401).json(
        { message: 'Unauthorized' }
    );

    const bookings = await models.Orders.findAll({ where: { UserID: id } });
    return res.status(200).json({ bookings: bookings });


});

export default router;
