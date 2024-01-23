const { DataTypes } = require('sequelize')
const sequelize = require('../database/db');

const packages = sequelize.define('packages', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }, 
    tracking: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
	description: {
        type: DataTypes.STRING,
        allowNull: false
    },

	state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
	customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'packages',
    timestamps: false,
})

module.exports = packages
