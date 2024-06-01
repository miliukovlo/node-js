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
        if (users.length === 0) {
            return null
        }

        return users
    }

    async createUser(body) {
        const {name, email, age} = body
        if (!name || !email || !age) {
            return null
        }
        const domain = getDomain(email)
        if (domain === '') {
            return null
        }
        const isUserInDB = await this.UserScheme.findOne({
            where: {
                email
                }
            })
        if (isUserInDB) {
            return null
        }
    const user = await this.UserScheme.create({
        name: name,
        email: email,
        age: age,
        domain: domain
    })
    return user
    }

    async getUser(id) {
        if (!id) {
            return null
        }
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

    async deleteUser(id) {
        if (!id) {
            return null
        }
        const user = await this.UserScheme.destroy({
            where: {
                id: id 
            }
        })
        if (!user) {
            return null
        }
        return user
    }

    async updateUser(id, body) {
        const {name, age, email} = body;
        let user = await this.UserScheme.findOne({
            where: {
                id
            }
        })
        const domain = getDomain(email ? email : user.email);

        const emailInDB = await this.UserScheme.findOne({
            where: {
                email: email ? email : user.email
            }
        })
    
        if (!user) {
            return null
        }
    
        if (domain === '') {
            return null
        }

        if (emailInDB && emailInDB.id !== user.id) {
            return null
        }
    
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
        if (!users) {
            return null
        }
        return users
    }

    async getUsersByDomain(domain) {
        const users = await this.UserScheme.findAll({
            where: {
                domain: domain.trim()
            }
        })
        if (!users) {
            return null
        }
        return users
    }

    async getSortedUsersByName() {
        const users = await this.UserScheme.findAll({
            order: [['name', 'ASC']]
        })
        if (!users) {
            return null
        }
        return users
    }
}

module.exports = new UserModel()