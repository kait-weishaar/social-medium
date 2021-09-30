//import thought and user, but not reaction?
const {Thought, User} = require("../models");

const userController = {
    //route to get all
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .populated({
            path: "thoughts",
            select: "-__v",
        })
        .select(-__v)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400),json(err);
        });
    },
}