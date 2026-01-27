import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let Bestillinger = sequelize.define('bestillinger', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        type: DataTypes.DATEONLY,
        allowNull: false
    }

}, {
    tableName: 'bestillinger',
    timestamps: true
});

export default Bestillinger;
