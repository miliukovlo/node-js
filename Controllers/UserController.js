const { Sequelize, DataTypes } = require("sequelize");

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