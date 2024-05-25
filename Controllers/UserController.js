const { DataTypes } = require("sequelize");
const { Sequelize } = require("../db/db");

const User = Sequelize.define(
    'Users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
)