import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let Employees = sequelize.define('Employees', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employee_roles',
            key: 'Id'
        }
    },
    salon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'salon',
            key: 'Id'
        }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'employees',
    timestamps: true
});

export default Employees;
