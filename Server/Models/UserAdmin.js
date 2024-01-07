const mongoose = require('mongoose');

const userAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    level: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    block_reason: {
        type: String
    }
});

const UserAdmin = mongoose.model('UserAdmin', userAdminSchema);

module.exports = UserAdmin;