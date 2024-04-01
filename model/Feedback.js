const mongoose = require('mongoose');

const Feedbackschema = new mongoose.Schema({
    feedback:{
        type:String,
        require:true
    }

});

module.exports = mongoose.model ('Feedback', Feedbackschema);