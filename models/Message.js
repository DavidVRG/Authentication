const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

module.exports = new mongoose.model('Message', messageSchema)