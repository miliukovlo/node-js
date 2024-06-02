const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./db/db')
const cors = require('cors')
const router = require('./Routes/router')
const UserModel = require('./Models/UserModel')
const UserController = require('./Controllers/UserController')
const UserService = require('./service/UserService')

const userService = new UserService(UserModel)
const userController = new UserController(userService)

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api', router(userController))       

const start = async () => {
    try {
        await sequelize.authenticate()
        await userController.syncModel()
        app.listen(port, () => {
            console.log(`Сервер запущен на ${port} порту`)
        })
    } catch (e) {
        console.log(e)
        console.log('Не удалось подключиться к базе данных')
    }
}
start()
