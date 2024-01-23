const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const status = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity_package: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'statuses',
    timestamps: false
})

module.exports = status;