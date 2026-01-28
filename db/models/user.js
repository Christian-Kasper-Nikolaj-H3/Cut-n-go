import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let user = sequelize.define('user', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'user',
    timestamps: true
});

export default user;
