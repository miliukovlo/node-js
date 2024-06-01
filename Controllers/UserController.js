const UserModel = require("../Models/UserModel")
const ApiError = require('../Error/ApiError')
const getDomain = require("../Hooks/getDomain")
const fs = require('fs')

class UserController {

    static writeToFile(filePath, data, next) {
        fs.writeFile(__dirname + '/../JSON/' + filePath, data, (e) => {
            if (e) {
                next(ApiError.badRequest('Не удалось локально сохранить файл'))
            } else {
                console.log('Файл был успешно сохранен!')
            }
        })
    }

    //Создание пользователя 

    async createUser(req, res, next) {
        const {name, email, age} = req.body
        if (!name || !email || !age) {
            return next(ApiError.badRequest('Вы не ввели данные'))
        }
        const isUserInDB = await UserModel.findOne({
            where: {
                email
            }
        })
        if (isUserInDB) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const domain = getDomain(email)
        if (domain === '') {
            return next(ApiError.badRequest('Вы ввели не корректный email'))
        }
        const user = await UserModel.create({name, email, domain, age})

        const jsonLastCreatedUser = JSON.stringify(user)
        UserController.writeToFile('LastCreatedUser.json', jsonLastCreatedUser)

        return res.json(user)
    }

    //Получение данных о всех пользователях

    async getAllUsers (req, res, next) {
        const users = await UserModel.findAll()
        if (users.length === 0) {
            return next(ApiError.badRequest('В базе данных нет пользователей'))
        }

        const jsonUsers = JSON.stringify(users)
        UserController.writeToFile('GetAllUsers.json', jsonUsers)

        return res.json(users)
    }

    //Получение данных о определенном пользователе

    async getUser (req, res, next) {
        const {id} = req.params
        if (!Number(id)) {
            return next(ApiError.badRequest('Вы ввели не корректный id пользователя!'))
        }
        const user = await UserModel.findOne(
            {
                where: {
                    id
                }
            }
        )
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким id не найден!'))
        }

        const jsonLastGetUser = JSON.stringify(user)
        UserController.writeToFile('LastGetUser.json', jsonLastGetUser)

        return res.json(user)
    }

    // Удаление пользователя из таблицы
    async deleteUser (req, res, next) {
        const {id} = req.params
        const user = await UserModel.findOne(
            {
                where: {
                    id
                }
            }
        )
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким id не найден!'))
        }
        await UserModel.destroy({
            where: {
                id: id
            }
        })

        const jsonLastDeletedUser = JSON.stringify(user)
        UserController.writeToFile('LastDeletedUser.json', jsonLastDeletedUser)

        return res.json(user)
    }

    //Обновление данных о пользователе
    async putUser(req, res, next) {

        const {id} = req.params;
        const {name, age, email} = req.body;
        if (!name && !age && !email) {
            return next(ApiError.badRequest('Вы ничего не указали!'))
        }
        let user = await UserModel.findOne({
            where: {
                id
            }
        })
        const domain = getDomain(email ? email : user.email);

        const emailInDB = await UserModel.findOne({
            where: {
                email: email ? email : user.email
            }
        })
    
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким id не найден!'));
        }
    
        if (domain === '') {
            return next(ApiError.badRequest('Вы ввели некорректный email'));
        }

        if (emailInDB && emailInDB.id !== user.id) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
    
        user.name = name ? name : user.name;
        user.age = age ? age : user.age;
        user.email = email ? email : user.email;
        user.domain = domain;
    
        await user.save();

        const jsonLastUpdatedUser = JSON.stringify(user)
        UserController.writeToFile('LastUpdatedUser.json', jsonLastUpdatedUser)
    
        return res.json(user);
    }

    //Получение пользователей с определенным возрастом
    async getUsersByAge (req, res, next) {
        const {age} = req.params
        const users = await UserModel.findAndCountAll({
            where: {
                age: age
            }
        })
        if (users.count === 0) {
            return next(ApiError.badRequest('Пользователей с таким возрастом не найдено!'))
        }

        const jsonGetUserByAge = JSON.stringify(users)
        UserController.writeToFile('GetUsersByAge.json', jsonGetUserByAge)

        return res.json(users.rows)
    }

    //Получение пользователей с определенным доменом
    async getUsersByDomain (req, res, next) {
        const {domain} = req.params
        const users = await UserModel.findAndCountAll({
            where: {
                domain: domain.trim()
            }
        })
        if (users.count === 0) {
            return next(ApiError.badRequest('Пользователей с таким доменом не найдено!'))
        }

        const jsonGetUserByDomain = JSON.stringify(users)
        UserController.writeToFile('GetUsersByDomain.json', jsonGetUserByDomain)

        return res.json(users.rows)
    }

    //Получение отсортированного списка пользователей по имени
    async getSortedUsersByName(req, res, next) {
        const users = await UserModel.findAll({
            order: [['name', 'ASC']]
        });
        if (users.length === 0) {
            return next(ApiError.badRequest('В базе данных нет пользователей!'))
        }

        const jsonGetSortedUsers = JSON.stringify(users)
        UserController.writeToFile('GetSortedUsers.json', jsonGetSortedUsers)

        return res.json(users);
    }
    
}
module.exports = new UserController()