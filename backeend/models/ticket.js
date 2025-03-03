const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
