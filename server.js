const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require("path");
const db = require('./models');
// const seeder = require('./seeders/seed');

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
		return res.json(data);
	});	
});

// route to return exercise.html
app.get('/exercise', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

//route to add exercise to workout
app.put('/api/workouts/:id', (req,res)=>{
	if(req.params.id){
		db.Workout.updateOne({ _id: req.params.id },{$push: { exercises:req.body }}, (err,data)=>{
			if(err){
				return res.json(err);
			}
			if(data){
				return res.json(data);
			}
		});
	} else{
		return res.json('Didnt update');
	}
	
});

//route to create a workout
app.post('/api/workouts', (req, res)=>{
		
	let wo = new db.Workout();
	db.Workout.create(wo, (err, data)=>{
		if(err){
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});