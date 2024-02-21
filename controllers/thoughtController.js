const { Thought, Reaction } = require('../models');

module.exports = {
    // GET all users
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //POST create new thought
    async createThoughts(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //PUT update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    //DELETE thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            // await Thought.deleteMany({ _id: { $in: user.Thought } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //POST new reaction to thought
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //DELETE reaction by id
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndDelete(
                { _id: req.params.reactionId },
                // { $pull: { reactions: req.params.reactionId } },
                { new: true },
                );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }

            // await Thought.deleteMany({ _id: { $in: user.Thought } });
            res.json({ message: 'reaction deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};