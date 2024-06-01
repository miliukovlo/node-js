const fs = require('fs')

class UserService {
    constructor(userModel) {
        this.userModel = userModel
    }

    static writeToFile(filePath, data, next) {
        fs.writeFile(__dirname + '/../JSON/' + filePath, data, (e) => {
            if (e) {
                return null
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
                const user = await this.userModel.createUser(body)
        
                const jsonLastCreatedUser = JSON.stringify(user)
                UserService.writeToFile('LastCreatedUser.json', jsonLastCreatedUser)
        
                return user
        } catch (e) {
            return e
        }
    }

    async getUser(id) {
        try {
            const user = await this.userModel.getUser(id)
            if (!user || !id) {
                return null
            }

            const jsonLastGetUser = JSON.stringify(user)
            UserService.writeToFile('LastGetUser.json', jsonLastGetUser)
            return user
        } catch (e) {
            return e
        }
    }

    async deleteUser(id) {
        try {
            if (!id) {
                return null
            }

            const user = await this.userModel.deleteUser(id)

            if (!user) {
                return null
            }

            const jsonLastDeletedUser = JSON.stringify(user)
            UserService.writeToFile('LastDeletedUser.json', jsonLastDeletedUser)

            return user
            } catch (e) {
                return e
            }
    }

    async updateUser(id, body) {
        try {
            
        if (!id || !body) {
            return null
        }

        const user = this.userModel.updateUser(id, body)

        const jsonLastUpdatedUser = JSON.stringify(user)
        UserService.writeToFile('LastUpdatedUser.json', jsonLastUpdatedUser)

        return user
        } catch (e) {
            return e
        }
    }

    async getUsersByAge(age) {
        try {
            if (!age) {
                return null
            }
            const users = this.userModel.getUsersByAge(age)
            if (!users) {
                return null
            }
    
            const jsonGetUserByAge = JSON.stringify(users)
            UserService.writeToFile('GetUsersByAge.json', jsonGetUserByAge)
    
            return users
        } catch (e) {
            return e
        }
    }

    async getUsersByDomain(domain) {
        try {
            if (!domain) {
                return null
            }
            const users = this.userModel.getUsersByDomain(domain)
            if (!users) {
                return null
            }
    
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
            if (!users) {
                return null
            }
    
            const jsonGetSortedUsers = JSON.stringify(users)
            UserService.writeToFile('GetSortedUsers.json', jsonGetSortedUsers)
    
            return users
        } catch (e) {
            return e
        }
    }

}

module.exports = UserService