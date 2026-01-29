import { Router } from 'express';
import models from '../db/models.js';
import { validateBookingData } from '../utils/validation.js';

const router = Router();

/**
 * POST /api/booking/new
 *
 * Expects JSON body:
 * {
 *   "SalonID": 1-12,
 *   "KundeFornavn": "non-empty string",
 *   "KundeEfternavn": "non-empty string",
 *   "KundeTelefon": "min 8 digits (string)",
 *   "KundeEmail": "valid email",
 *   "BestillingDato": "YYYY-MM-DDTHH:mm (optional :ss) local datetime"
 * }
 *
 * Responses:
 * 201: created booking
 * 400: { status: 'Validation error', errors: { field: message } }
 */
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

/**
 * GET /api/booking/available-times
 * 
 * Query params:
 * - salonID: required
 * - date: required (YYYY-MM-DD)
 * 
 * Returns available time slots for the given salon and date
 */
router.get('/booking/available-times', async (req, res) => {
    const { salonID, date } = req.query;

    if (!salonID || !date) {
        return res.status(400).json({ status: 'Missing salonID or date parameter' });
    }

    try {
        // Hent alle bookinger for den valgte salon og dato
        const bookings = await models.Bestillinger.findAll({
            where: {
                SalonID: Number(salonID),
            }
        });

        // Filtrer bookinger for den specifikke dag
        const bookedTimes = bookings
            .filter(booking => {
                const bookingDate = new Date(booking.BestillingDato);
                const requestDate = new Date(date);
                return bookingDate.toDateString() === requestDate.toDateString();
            })
            .map(booking => {
                const d = new Date(booking.BestillingDato);
                return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
            });

        // Generer alle mulige tider (09:00 - 17:00, hver 30 min)
        const allTimes = [];
        for (let hour = 9; hour < 17; hour++) {
            allTimes.push(`${String(hour).padStart(2, '0')}:00`);
            allTimes.push(`${String(hour).padStart(2, '0')}:30`);
        }

        // Filtrer ledige tider
        const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));

        return res.status(200).json({ availableTimes });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ status: 'Internal server error' });
    }
});

export default router;