//import thought and user, but not reaction?
const {Thought, User} = require("../models");


//Now CRUD + add reaction
const thoughtController = {
    //route to get all
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .select("-__v")
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
            res.status(400).json(err);
        });
    },
    createThought({ body }, res) {
        Thought.create(body)
        .then((newThoughtData) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: newThoughtData._id}},
                {new: true}
            )
        })
        .then((newThoughtData) => {
            if (!newThoughtData) {
                res.status(404).json({message: "No user found with specified ID"});
                return;
            }
            res.json(newThoughtData);
        })
        .catch((err) => res.json(err));
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then((updatedThought) => {
            if(!updatedThought) {
                res.status(404).json({message: "No thought found with specified ID"});
                return;
            }
            res.json(updatedThought);
        })
        .catch((err) => res.json(err));
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with specified ID"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    newReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: { reactionId: params.reactionId }}},
            {new: true}
        )

        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: { reactions: {reactionId: params.reactionId }}},
            {new: true}
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    }

};


module.exports = thoughtController;