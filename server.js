const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require("path");
const db = require('./models');


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

//base path
app.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

//route to get all workouts, which renders the most recent due to front end logic
app.get('/api/workouts', (req, res)=> {
	db.Workout.find({}, (err, data)=>{
		console.log('datalog ', data[data.length-1]);
		res.json(data);
	});	
});

// route to return exercise.html
app.get('/exercise', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
//route to create a workout
app.post('/api/workouts', (req, res)=>{
	console.log('req.body in api/workouts post ',req.body);
	res.json('hello');
});

//route to add exercise to workout
app.put('/api/workouts/:id', (req,res)=>{
	console.log('req.body in api/workouts with id ' , req.body)
	db.Workout.updateOne({ _id: req.params.id },{$push: { exercises:req.body }}, (err,data)=>{
		if(err){
			console.log('err ', err);
		}
		if(data){
			console.log('data ', data);
			res.json(data);
		}
	});
	// res.json(data);
});