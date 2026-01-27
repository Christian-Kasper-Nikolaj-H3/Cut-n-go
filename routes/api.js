import { Router } from 'express';
import models from '../db/models.js';

const router = Router();

router.post('/booking/new', (req, res) => {
    res.end();
});

router.get('/booking/get/all', async (req, res) => {
    try {
        const data = await models.Bestillinger.findAll({});
        return res.status(200).json(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({status: 'Internal server error'});
    }
});

export default router;