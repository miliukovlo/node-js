const Router = require('express')
const router = new Router()
const UserController = require('../Controllers/UserController')

router.get('/users', UserController.getAllUsers)
router.post('/users', UserController.createUser)
router.get('/users/:id', UserController.getUser)
router.delete('/users/:id', UserController.deleteUser)
router.put('/users/:id', UserController.putUser)
router.get('/users/age/:age', UserController.getUsersByAge)

module.exports = router