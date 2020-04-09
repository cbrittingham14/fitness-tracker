const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        required: 'Type is required'
    },
    name: {
        type:String,
        required: 'name is required'
    },
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;