const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const getDomain = require("../Hooks/getDomain")

class UserModel {
    constructor() {
        this.UserScheme = sequelize.define(
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
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                domain: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                    autoIncrement: true
                },
            }
        )
    }

    async syncModel() {
        return await this.UserScheme.sync()
    }

    async getAllUsers () {
        const users = await this.UserScheme.findAll()
        return users
    }

    async createUser(name, age, email, domain) {
        const user = await this.UserScheme.create({
            name: name,
            email: email,
            age: age,
            domain: domain
        })
        return user
    }

    async getUserById(id) {
        const user = await this.UserScheme.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            return null
        }
        return user
    }
    async getUserByEmail(email) {
        const user = await this.UserScheme.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return null
        }
        return user
    }

    async deleteUser(id) {
        const user = await this.UserScheme.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            return null
        }
        await this.UserScheme.destroy({
            where: {
                id: id 
            }
        })
        return user
    }

    async updateUser(id, {name, age, email}, domain) {
        let user = await this.UserScheme.findOne({
            where: {
                id
            }
        })
        user.name = name ? name : user.name;
        user.age = age ? age : user.age;
        user.email = email ? email : user.email;
        user.domain = domain;
    
        await user.save();

        return user
    }

    async getUsersByAge(age) {
        const users = await this.UserScheme.findAll({
            where: {
                age: age
            }
        })
        return users
    }

    async getUsersByDomain(domain) {
        const users = await this.UserScheme.findAll({
            where: {
                domain: domain
            }
        })
        return users
    }

    async getSortedUsersByName() {
        const users = await this.UserScheme.findAll({
            order: [['name', 'ASC']]
        })
        return users
    }
}

module.exports = new UserModel()