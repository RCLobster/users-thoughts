const router = require('express').Router();

const {
    getThoughts,
    createThoughts,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThoughts)

router.route('/:thoughtId').put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').put(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;