const express = require('express');
const { handlerGetAllUser, handlerPostUser, handlerPutUser, handlerDeleteUser, handlerFindByPk } = require('./handler');
const router = express.Router();

// method get users
router.get('/', handlerGetAllUser);

//method create user
router.post('/', handlerPostUser);

//method update user
router.put('/:id', handlerPutUser);

//method delete user
router.delete('/:id', handlerDeleteUser);

//method find user by id
router.get('/:id', handlerFindByPk)

module.exports = router;