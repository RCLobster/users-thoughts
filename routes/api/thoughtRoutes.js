const router = require('express').Router();

const {
    getThoughts,
    createThoughts,
    //deleteThoughts,
    //createReaction,
    //deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThoughts)//.delete(deleteThoughts);

//router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;