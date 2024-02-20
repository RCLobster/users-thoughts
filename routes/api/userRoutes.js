const router = require('express').Router();

const {
    getUsers,
    //getSingleUser,
    //createUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers);

module.exports = router;