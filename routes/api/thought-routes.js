const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

//Get and post routes /api/thoughts/
router.route("/").get(getAllThoughts).post(createThought);

//set up routes based on thought ids /api/users/:id
router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
    
//add routes for reactions
router.route("/:thoughtId/reactions")
    .post(newReaction);
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;