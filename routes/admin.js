import { Router } from 'express';
import models from '../db/models.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/salon/all', requireAuth, requireAdmin, async (req, res) => {
    try {
        const salons = await models.Salon.findAll();
        return res.status(200).json({
            success: true,
            data: {
                salons: salons
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.post('/salon/new', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { name, address, city, phone, email } = req.body;
        const newSalon = await models.Salon.create({
            name: name,
            address: address,
            city: city,
            phone: phone,
            email: email
        });

        return res.status(201).json({
            success: true,
            data: {
                salon: newSalon
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.put('/salon/update/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        const salonId = Number(req.params.id);
        const { name, address, city, phone, email } = req.body;

        const salon = await models.Salon.findByPk(salonId);

        await salon.update({
            name,
            address,
            city,
            phone,
            email
        });

        return res.status(200).json({
            success: true,
            data: {
                salon
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.delete('/salon/delete/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        const salonId = Number(req.params.id);

        const salon = await models.Salon.findByPk(salonId);

        await salon.destroy();

        return res.status(200).json({
            success: true,
            message: 'Salon deleted'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.post('/employee/new', requireAuth, requireAdmin, async (req, res) => {
    try {
        console.log(req.body);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.get('/employee/all', requireAuth, requireAdmin, async (req, res) => {
    try {
        console.log(req.body);

        const employees = await models.Employees.findAll({
            attributes: ['id', 'first_name', 'last_name', 'role_id', 'salon_id'],
        });

        let emArr = [];
        for(const employee of employees) {
            const role = await models.EmployeeRoles.findByPk(employee.role_id);
            const salon = await models.Salon.findByPk(employee.salon_id);
            emArr.push({
                id: employee.id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                role: role.name,
                salon: salon.name,
            })
        }
        console.log(employees);
        return res.status(200).json({
            success: true,
            data: {
                employees: emArr
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

export default router;
