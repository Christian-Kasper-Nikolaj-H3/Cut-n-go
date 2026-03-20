import jwt from 'jsonwebtoken';
import models from '../db/models.js';

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const cookieToken = req.cookies?.token;
    const token = headerToken || cookieToken;
    if (!token) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        const user = await models.Users.findByPk(req.user.id, {
            attributes: ['Id', 'role_id'],
        });

        if (!user) {
            return res.status(404).json({ status: 'User not found' });
        }

        const adminRole = await models.UserRoles.findOne({
            where: { name: 'admin' },
            attributes: ['id'],
        });

        if (!adminRole || user.role_id !== adminRole.id) {
            return res.status(403).json({ status: 'Forbidden' });
        }

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: 'Internal server error' });
    }
};
