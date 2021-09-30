//import thought and user, but not reaction?
const {Thought, User} = require("../models");

const thoughtController = {
    //route to get all
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .populated({
            path: "thoughts",
            select: "-__v",
        })
        .select(-__v)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400),json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with specified ID"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400),json(err);
        });
    },
    
}