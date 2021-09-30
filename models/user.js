const { Schema, model } = require('mongoose');
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
            match: [
                //add in email validation
            ],
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

//Use virtual for friendcount


//Create model
const User = model("User", UserSchema);

//Export
module.exports = User;