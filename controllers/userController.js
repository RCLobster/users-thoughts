const { Users, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await Users.find();
            res.json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // GET single user by id
    async getSingleUser(req, res) {
        try {
            const users = await Users.findById({ _id: req.params.userId });
            res.json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },

};