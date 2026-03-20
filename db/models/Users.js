import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

let Users = sequelize.define('Users', {

    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user_roles',
            key: 'id'
        }
    },

    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Password_hash: {
        type: DataTypes.STRING,
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
    }

}, {
    tableName: 'User',
    timestamps: true
});

export default Users;
