const Router = require('express')
const router = new Router()
const UserController = require('../Controllers/UserController')

router.get('/users', UserController.getAllUsers)
router.get('/users/sorted', UserController.getSortedUsersByName)
router.post('/users', UserController.createUser)
router.get('/users/:id', UserController.getUser)
router.delete('/users/:id', UserController.deleteUser)
router.put('/users/:id', UserController.putUser)
router.get('/users/age/:age', UserController.getUsersByAge)
router.get('/users/domain/:domain', UserController.getUsersByDomain)

module.exports = router