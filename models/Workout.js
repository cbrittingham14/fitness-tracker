const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    date: Date,
    exercises: [
        {
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
        }
    ]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;