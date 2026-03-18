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

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await models.Users.findByPk(req.user.id, {
            attributes: [
                'Id',
                'Username',
                'KundeFornavn',
                'KundeEfternavn',
                'KundeTelefon',
                'KundeEmail',
            ],
        });

        if (!user) {
            return res.status(404).json({ status: 'User not found' });
        }

        return res.status(200).json({
            id: user.Id,
            username: user.Username,
            name: user.KundeFornavn,
            surname: user.KundeEfternavn,
            phone: user.KundeTelefon,
            email: user.KundeEmail,
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ status: 'Internal server error' });
    }
});

export default router;
