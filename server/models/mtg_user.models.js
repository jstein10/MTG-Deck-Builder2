const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //userID: String, //probably a string? Whatever we get from Auth0 or whatever login we use.
    email: { //Auth0 should return an e-mail, so that will be how we track a user's decks.
        type: String,
        required: [true, "Users must sign in with an e-mail."],
        minlength: [5, "The e-mail provided is too short."]
    },
    // password: { //may not be needed with auth0
    //     type: String, //Look into hashing? or depending on how auth works, password may not need to be stored at all.
    //     required: [true, "Please enter a password."],
    //     minlength: [8, "Passwords must be at least 8 characters."]
    // },
    decks: Map //Map is mongoose's way of setting key-value pairs.
}, {timestamps: true});

module.exports.User = mongoose.model("User", UserSchema);