import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let UserRoles = sequelize.define('UserRoles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_roles',
    timestamps: true
});

export default UserRoles;
