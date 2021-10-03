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

//Get and post routes
router.route("/").get(getAllThoughts).post(createThought);

//set up routes based on thought ids
router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
    
//add routes for reactions
router.route("./thoughtId/reactions")
    .post(newReaction)
    .delete(deleteReaction);

module.exports = router;