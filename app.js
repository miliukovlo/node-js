const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./db/db')
const cors = require('cors')
const UserModel = require('./Models/UserModel')
const router = require('./Routes/router')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api', router)

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
