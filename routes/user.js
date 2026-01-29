import { Router } from 'express';
import {requireAuth} from "../middleware/auth.js";
import {Op} from "sequelize";
import models from '../db/models.js';

const router = Router();

router.get('/bookings', requireAuth, async (req, res) => {
    try {
        const { id } = req.user;
        if(!id) return res.redirect('/sign-in');

        const now = new Date();

        const upcoming = await models.Orders.findAll({
            where: {
                UserID: id,
                BestillingDate: { [Op.gte]: now }
            },
            order: [['BestillingDate', 'ASC']]
        });

        const completed = await models.Orders.findAll({
            where: {
                UserID: id,
                BestillingDate: { [Op.lt]: now }
            },
            order: [['BestillingDate', 'DESC']]
        });

        res.status(200).json({ upcoming, completed });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({status: 'Internal server error'});
    }

});

export default router;