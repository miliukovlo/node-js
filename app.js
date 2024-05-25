const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./db/db')
const UserModel = require('./Models/UserModel')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

const start = async () => {
    try {
        await sequelize.authenticate()
        await UserModel.sync()
        app.listen(port, () => {
            console.log(`Сервер запущен на ${port} порту`)
        })
    } catch (e) {
        console.log(e)
        console.log('Не удалось подключиться к базе данных')
    }
}
start()
