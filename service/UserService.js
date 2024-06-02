const fs = require('fs')
const getDomain = require('../Hooks/getDomain')

class UserService {
    constructor(userModel) {
        this.userModel = userModel
    }

    static writeToFile(filePath, data) {
        fs.writeFile(__dirname + '/../JSON/' + filePath, data, (e) => {
            if (e) {
                return console.log('Неудалось сохранить файл!')
            } else {
                console.log('Файл был успешно сохранен!')
            }
        })
    }

    async syncModel() {
        try {
            return await this.userModel.syncModel()
        } catch (e) {
            return e
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userModel.getAllUsers()
            const jsonUsers = JSON.stringify(users)
            UserService.writeToFile('GetAllUsers.json', jsonUsers)
            return users
        } catch (e) {
            return e
        }
    }

    async createUser(body) {
        try {
                const {name, email, age} = body
                if (!name || !age || !email) {
                    return null
                }
                const domain = getDomain(email)
                if (domain === '') {
                    return null
                }
                const isUserInDB = await this.userModel.getUserByEmail(email)
                if (isUserInDB === null) {
                    const user = await this.userModel.createUser(name, age, email, domain)
                    const jsonLastCreatedUser = JSON.stringify(user)
                    UserService.writeToFile('LastCreatedUser.json', jsonLastCreatedUser)
                    return user
                } else {
                    return null
                }
        } catch (e) {
            return e
        }
    }

    async getUser(id) {
        try {
            const user = await this.userModel.getUserById(id)
            const jsonLastGetUser = JSON.stringify(user)
            UserService.writeToFile('LastGetUser.json', jsonLastGetUser)
            return user
        } catch (e) {
            return e
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.userModel.deleteUser(id)
            const jsonLastDeletedUser = JSON.stringify(user)
            UserService.writeToFile('LastDeletedUser.json', jsonLastDeletedUser)
            return user
            } catch (e) {
                return e
            }
    }

    async updateUser(id, body) {
        try {
            const isUserInDB = await this.userModel.getUserById(id)
            if (isUserInDB === null) {
                return null
            }
            const domain = getDomain(body.email ? body.email : isUserInDB.email);
            if (domain === '') {
                return null
            }
            const emailInDB = await this.userModel.getUserByEmail(body.email ? body.email : isUserInDB.email)
            if (emailInDB && emailInDB.id !== user.id) {
                return null
            }
            const user = await this.userModel.updateUser(id, body, domain)
            const jsonLastUpdatedUser = JSON.stringify(user)
            UserService.writeToFile('LastUpdatedUser.json', jsonLastUpdatedUser)
            return user
        } catch (e) {
            return e
        }
    }

    async getUsersByAge(age) {
        try {
            const users = await this.userModel.getUsersByAge(age)
            const jsonGetUserByAge = JSON.stringify(users)
            UserService.writeToFile('GetUsersByAge.json', jsonGetUserByAge)
            return users
        } catch (e) {
            return e
        }
    }

    async getUsersByDomain(domain) {
        try {
            const users = await this.userModel.getUsersByDomain(domain.trim().toLowerCase())
            const jsonGetUserByDomain = JSON.stringify(users)
            UserService.writeToFile('GetUsersByDomain.json', jsonGetUserByDomain)
            return users
        } catch (e) {
            return e
        }
    }

    async getSortedUsersByName() {
        try {
            const users = await this.userModel.getSortedUsersByName()
            const jsonGetSortedUsers = JSON.stringify(users)
            UserService.writeToFile('GetSortedUsers.json', jsonGetSortedUsers)
            return users
        } catch (e) {
            return e
        }
    }

}

module.exports = UserService