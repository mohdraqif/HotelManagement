const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageurls: [],
    currentbookings: [{
        bookingId: String,
        status: String,
        userId: String,
        fromDate: String,
        toDate: String,
    }],
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('rooms', roomSchema);
