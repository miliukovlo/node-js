const Router = require('express')

module.exports = (userController) => {
    const router = new Router()

    router.get('', userController.getAllUsers)
    router.post('', userController.createUser)
    router.get('/sorted', userController.getSortedUsersByName)
    router.get('/:id', userController.getUser)
    router.delete('/:id', userController.deleteUser)
    router.put('/:id', userController.updateUser)
    router.get('/age/:age', userController.getUsersByAge)
    router.get('/domain/:domain', userController.getUsersByDomain)

    return router
}