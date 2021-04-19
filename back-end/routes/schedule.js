const express = require('express');
const mongoose = require('mongoose');
const User = require('./users').model;
const Student = require('./students').model;
const validateUser = require('./users').valid;

const router = express.Router();

const scheduleSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: String
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

router.get('/', validateUser, async (req, res) => {
  try {
    let schedules = await Schedule.find({ teacher: req.user }).populate('student');
    res.send({ schedules: schedules });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', validateUser, async (req, res) => {
  if(!req.body.id || !req.body.time)
    return res.status(400).send({ message: 'student id and lesson time are required' });

  try {
    const student = await Student.findOne({ _id: req.body.id });

    if (!student)
      return res.status(404).send({ message: 'valid student id required'})

    const studentUser = await User.findOne({ _id: student.student });
    
    const schedule = new Schedule({
      student: studentUser,
      teacher: req.user,
      time: req.body.time
    })

    await schedule.save();

    res.send({ schedule: schedule });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', validateUser, async (req, res) => {
  try {
    await Schedule.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Schedule
}