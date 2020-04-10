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
    ],
    totalDuration: Number,
    totalReps: Number,
    totalDistance: Number,
    totalSets: Number,
    totalDistance: Number,
});

workoutSchema.methods.getTotalDuration = function(){
    let totalLength;
    exercises.forEach(el => {
        totalLength += el.duration;
    });
    this.totalDuration = totalLength;
    return totalDuration;
};
workoutSchema.methods.getExerciseCount = function(){
    return this.exercises.length;
};
workoutSchema.methods.getTotalWeight = function(){
    let totalWeight;
    exercises.forEach(el=>{
        totalWeight += el.weight;
    });
    this.totalWeight = totalWeight;
    return this.totalWeight;
};
workoutSchema.methods.getTotalReps = function(){
    let reps;
    exercises.forEach(el=>{
        reps += el.reps;
    });
    this.totalReps = reps;
    return this.totalReps;
}

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;