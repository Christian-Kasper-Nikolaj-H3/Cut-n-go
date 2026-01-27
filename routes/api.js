import { Router } from 'express';
import models from '../db/models.js';
import { validateBookingData } from '../utils/validation.js';

const router = Router();

router.post('/booking/new', async (req, res) => {
    const { isValid, errors } = validateBookingData(req.body);

    if (!isValid) {
        return res.status(400).json({status: 'Validation error', errors: errors ?? 'Unknown error'});
    }

    const { SalonID, KundeFornavn, KundeEfternavn, KundeTelefon, KundeEmail, BestillingDato } = req.body;

    try {
        const created = await models.Bestillinger.create({
            SalonID: Number(SalonID),
            KundeFornavn: KundeFornavn.trim(),
            KundeEfternavn: KundeEfternavn.trim(),
            KundeTelefon: KundeTelefon.trim(),
            KundeEmail: KundeEmail.trim(),
            BestillingDato: new Date(BestillingDato.trim())
        });

        return res.status(201).json(created);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({status: 'Internal server error'});
    }
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