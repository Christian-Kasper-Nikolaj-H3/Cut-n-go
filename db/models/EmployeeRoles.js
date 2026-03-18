import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let EmployeeRoles = sequelize.define('EmployeeRoles', {
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
    tableName: 'employee_roles',
    timestamps: true
});

export default EmployeeRoles;
