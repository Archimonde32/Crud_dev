const router = require('express').Router();
const userController = require('./user.controller');
// register a new user
router.post('/register', userController.createUser);

//get all users
router.get('/all', userController.AllUsers);

// modifier user
router.put('/:id', userController.UpdateUsers);

// supprimer user
router.delete('/:id', userController.SuppUser);


module.exports = router;
