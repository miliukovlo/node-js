class UserController {
    constructor(userService) {
        this.userService = userService
    }
    //Подключение к базе данных и синхронизация данных
    async syncModel() {
        return await this.userService.syncModel()
    }
    //Получение списка всех пользователей
    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers()
            if (!users) {
                res.status(404).json({error: 'Пользователей нет в базе данных!'})
            }
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    //Создание пользователя 

    createUser = async (req, res) => {
        try {
            const user = await this.userService.createUser(req.body)
            if (!user) {
                res.status(400).json({error: 'Не удалось создать пользователя'})
            }
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    // //Получение данных о определенном пользователе

    getUser = async (req, res) => {
        try {
            const {id} = req.params
            const user = await this.userService.getUser(id)
            if (!user) {
                res.status(404).json({error: 'Не удалось найти пользователя'})
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    // // Удаление пользователя из таблицы

    deleteUser = async (req, res) => {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({error: 'Вы не указали, что нужно удалить!'})
            }
            const user = await this.userService.deleteUser(id)
            if (!user) {
                res.status(400).json({error: 'Не удалось удалить пользователя'})
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error: error.message})
        }

    }

    // //Обновление данных о пользователе

    updateUser = async (req, res) => {
        try {
            const {id} = req.params
            const body = req.body
            if (!body || !id) {
                res.status(404).json({error: 'Вы не ввели данные!'})
            }
            const user = await this.userService.updateUser(id, body)
            if (!user) {
                res.status(400).json({error: 'Не удалось обновить данные пользователя!'})
            }
            res.status(200).json({user})
        } catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    // //Получение пользователей с определенным возрастом
    getUsersByAge = async (req, res) => {
        try {
            const {age} = req.params
            const users = await this.userService.getUsersByAge(age)
            if (!users) {
                res.status(404).json({error: 'Пользователи с данным возрастом не найдены!'})
            }
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    // //Получение пользователей с определенным доменом
    getUsersByDomain = async (req, res) => {
        try {
            const {domain} = req.params
            const users = await this.userService.getUsersByDomain(domain)
            if (!users) {
                res.status(404).json({error: 'Пользователи с таким доменом не найдены!'})
            }
            res.status(200).json(users)
        } catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    // //Получение отсортированного списка пользователей по имени
    getSortedUsersByName = async (req, res) => {
        try {
            const users = await this.userService.getSortedUsersByName()
            if (users.length === 0) {
                res.status(404).json({error: 'Пользователи не найдены!'})
            }
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    
}
module.exports = UserController