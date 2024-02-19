const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
    },
    thoughts: [thoughtSchema],
    friends: [userSchema._id]
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;