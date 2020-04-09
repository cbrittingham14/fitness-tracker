const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require("path");
const db = require('./models');
// const workoutSeed = require('./seeders/seed.js');

const PORT = process.env.PORT || 8080;

const app = express();


app.use(logger('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


app.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/api/workouts', (req, res)=> {
	// db.Workout.findOne({}, (err, data)=>{
	// 	if(err) console.log(err);
	// 	console.log('data ', data);
	// 	res.json(data);
	// });
		db.Workout.find({}, (err, data)=>{
			console.log('data[0].exercises ', data[0].exercises);
			res.json(data);
		});	
});

app.get('/exercise', (req,res)=>{
    console.log('hit the route');
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});