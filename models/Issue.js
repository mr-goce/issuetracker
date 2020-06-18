const mongoose = require('mongoose');
const IssueSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        requred: true,

    },
    description: {
        type: String,
        requred: true,
        

    },
    status: {
        type: String,
        // enum: ['OPEN','IN PROGRESS','IMPLEMENTED']

    },
    type: {
        type: String,
        // enum: ['BUG','TASK'],

    },
    date: {
        type: Date,
        default: Date.now

    }

})
module.exports = mongoose.model('issue', IssueSchema)