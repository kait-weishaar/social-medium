const { Schema, model } = require('mongoose');
const { Thought } = require('.');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //STack overflow on mongoose matching for email: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//attempt to remove all thoughts associated with user on delete https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap
UserSchema.post("remove", document => {
    const userID = document._id;
    Thought.find({ users: {$in: [userID]}}).then(thoughts => {
        Promise.all(
            thoughts.map(thought => Thought.findByIdAndUpdate(
                thought._id,
                { $pull: {users: userUD}},
                {new: true}
            ))
        )
    })
});

//Create model
const User = model("User", UserSchema);

//Export
module.exports = User;