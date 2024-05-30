const fs = require('fs')

class UserService {
    constructor(userModel) {
        this.userModel = userModel
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
            fs.writeFile(__dirname + '/../' + '/JSON/GetAllUsers.json', jsonUsers, (e) => {
                if (e) {
                    return null
                } else {
                    console.log('Файл был успешно сохранен!')
                }
            })
            return users
        } catch (e) {
            return e
        }
    }

    async createUser(body) {
        try {
                const user = await this.userModel.createUser(body)
        
                const jsonLastCreatedUser = JSON.stringify(user)
                fs.writeFile(__dirname + '/../' + '/JSON/LastCreatedUser.json', jsonLastCreatedUser, (e) => {
                    if (e) {
                        return null
                    } else {
                        console.log('Файл был успешно сохранен!')
                    }
                })
        
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
            fs.writeFile(__dirname + '/../' + '/JSON/LastGetUser.json', jsonLastGetUser, (e) => {
                if (e) {
                    return null
                } else {
                    console.log('Файл был успешно сохранен!')
                }
            })
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
            fs.writeFile(__dirname + '/../' + '/JSON/LastDeletedUser.json', jsonLastDeletedUser, (e) => {
                if (e) {
                    return null
                } else {
                    console.log('Файл был успешно сохранен!')
                }
            })

            return user
            } catch (e) {
                return e
            }
    }

    async updateUser(id, body) {

        if (!id || !body) {
            return null
        }

        const user = this.userModel.updateUser(id, body)

        const jsonLastUpdatedUser = JSON.stringify(user)
        fs.writeFile(__dirname + '/../' + '/JSON/LastUpdatedUser.json', jsonLastUpdatedUser, (e) => {
            if (e) {
                return null
            } else {
                console.log('Файл был успешно сохранен!')
            }
        })

        return user
    }

    async getUsersByAge(age) {
        if (!age) {
            return null
        }
        const users = this.userModel.getUsersByAge(age)
        if (!users) {
            return null
        }

        const jsonGetUserByAge = JSON.stringify(users)
        fs.writeFileSync(__dirname + '/../' + '/JSON/GetUsersByAge.json', jsonGetUserByAge, (e) => {
            if (e) {
                return null
            } else {
                console.log('Файл был успешно сохранен!')
            }
        })

        return users
    }

    async getUsersByDomain(domain) {
        if (!domain) {
            return null
        }
        const users = this.userModel.getUsersByDomain(domain)
        if (!users) {
            return null
        }

        const jsonGetUserByDomain = JSON.stringify(users)
        fs.writeFile(__dirname + '/../' + '/JSON/GetUsersByDomain.json', jsonGetUserByDomain, (e) => {
            if (e) {
                return null
            } else {
                console.log('Файл был успешно сохранен!')
            }
        })

        return users
    }

    async getSortedUsersByName() {
        const users = await this.userModel.getSortedUsersByName()
        if (!users) {
            return null
        }

        const jsonGetSortedUsers = JSON.stringify(users)
        fs.writeFileSync(__dirname + '/../' + '/JSON/GetSortedUsers.json', jsonGetSortedUsers, (e) => {
            if (e) {
                next(ApiError.badRequest('Не удалось локально сохранить файл'))
            } else {
                console.log('Файл был успешно сохранен!')
            }
        })

        return users
    }

}

module.exports = UserService