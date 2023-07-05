
const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Users = db.define('users', {
    //por defecto crea el id

    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
     },

     name:{
        type: DataTypes.STRING(30),
        DefaultValue: 'John',
         }, 
    lastname:{
        type : DataTypes.STRING(50),
        DefaultValue: 'Doe',
    },

    email:{
        type : DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
        password: {
            type : DataTypes.STRING,
            allowNull: false
    },
});

module.exports = Users;