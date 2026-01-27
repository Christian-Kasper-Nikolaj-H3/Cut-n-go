import { Router } from 'express';

const router = Router();

router.get('/booking/get/all', (req, res) => {
    console.log("Get all bookings");
    res.status(200).json([]);
});

export default router;