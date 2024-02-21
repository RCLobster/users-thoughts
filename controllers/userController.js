const { Users } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await Users.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET single user by id
    async getSingleUser(req, res) {
        try {
            const users = await Users.findById({ _id: req.params.userId });
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //POST create new user
    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //PUT to update user by id
    async updateUser(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    //DELETE user by id
    async deleteUser(req, res) {
        try {
            const user = await Users.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            // await Thought.deleteMany({ _id: { $in: user.Thought } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST add friend to userId
    async addFriend(req,res) {
        try {
            const user = await Users.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId  } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);

        } catch(err) {
            res.status(500).json(err);
        }
    }
};