const mongoose = require('mongoose');

const TimeSchema = mongoose.Schema({
    start: {
        type: Number,
        required: true
    },
    stop: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

const Time = module.exports = mongoose.model('Time', TimeSchema);

module.exports.addTime = (time, callback) => {
    time.save(callback);
}

module.exports.getTime = (userId) => {
    return Time.findOne({ user: userId, stop: null });
}