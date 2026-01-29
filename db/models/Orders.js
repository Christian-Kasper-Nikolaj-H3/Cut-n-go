import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let Orders = sequelize.define('Orders', {

    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    UserID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    SalonID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    KundeFornavn: {
        type: DataTypes.STRING,
        allowNull: false
    },

    KundeEfternavn: {
        type: DataTypes.STRING,
        allowNull: false
    },

    KundeTelefon: {
        type: DataTypes.STRING,
        allowNull: false
    },

    KundeEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },

    BestillingDato: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: 'Orders',
    timestamps: true
});

export default Orders;
