const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: Date,
    message: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
