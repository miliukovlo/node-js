const express = require('express')
const UserRoutes = require('./UserRoutes')

module.exports = (
    userController
) => {
    const router = express.Router()
    const userRoutes = UserRoutes(userController)

    router.use('/users', userRoutes)

    return router
}