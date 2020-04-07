const express = require("express");
const router = express.Router();
const logger = require("morgan");
const path = require("path");
const app = express();
const db = require("../models");

app.use(logger("dev"));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(workoutDB => {
        res.json(workoutDB)
    })
    .catch(err => {
        console.log(err);
    })
})

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate (
        req.params.id, 
        {
            $push: {exercises: req.body}
        },
        {
            runValidators:true, new: true
        })
    .then(results => res.json(results))
    .catch(err => {
        console.log(err);
    })
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.json(err);
    })
});

router.get("/api/workouts/range", (req,res) => {
    db.Workout.find()
    .then(workoutDB => {
        res.json(workoutDB)
    })
    .catch(err => {
        console.log(err)
    })
});


module.exports = router;
