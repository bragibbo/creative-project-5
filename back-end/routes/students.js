const express = require('express');
const mongoose = require('mongoose');
const User = require('./users').model;
const validateUser = require('./users').valid;

const router = express.Router();

const today = () => {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth()+1; 
  const yyyy = today.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
}

const studentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: String,
  startDate: String,
  lessonLength: Number
})

const Student = mongoose.model('Student', studentSchema);

router.post('/', validateUser, async (req, res) => {
  if(!req.body.firstName && !req.body.lastName)
    return res.status(400).send({ message: 'firstname and lastname are required' });

  try {
    const studentUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.firstName,
      password: `${req.body.firstName}${req.body.lastName}`,
      email: req.body.email,
      gender: req.body.gender
    });
    await studentUser.save();

    let student = new Student({
      teacher: req.user,
      student: studentUser,
      price: req.body.price,
      startDate: req.body.startDate,
      lessonLength: parseInt(req.body.lessonLength)
    })
    await student.save();
    res.send({ student: student });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.post('/new_student', validateUser, async (req, res) => {
  try {
    let student = new Student({
      teacher: null,
      student: req.user,
      price: '$90.00',
      startDate: today(),
      lessonLength: 45
    })
    await student.save();
    res.send({ student: student });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
})

router.get('/teachers', validateUser, async (req, res) => {
  try {
    let teachers = await User.find({ role: 'teacher' });
    
    res.send({ teachers: teachers });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.get('/teacher', validateUser, async (req, res) => {
  try {
    let student = await Student.findOne({ student: req.user._id }).populate('teacher');
    if(!student.teacher) {
      return res.sendStatus(404);
    }
    
    res.send({ teacher: student.teacher });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.post('/teacher', validateUser, async (req, res) => {
  try {
    let student = await Student.findOne({ student: req.user._id });
    if(!student.teacher) {
      student.teacher = req.body.teacher._id;
      await student.save();
    }
    
    res.send({ teacher: student.teacher });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.get('/get_student/:id', validateUser, async (req, res) => {
  try {
    let student = await Student.findOne({ student: req.params.id }).populate('student');
    res.send({ student: student });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});


router.get('/:id', validateUser, async (req, res) => {
  try {
    let student = await Student.findOne({ _id: req.params.id }).populate('student');
    res.send({ student: student });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.get('/', validateUser, async (req, res) => {
  try {
    let students = await Student.find({ teacher: req.user }).populate('student');
    res.send({ students: students });
  } catch(error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', validateUser, async (req, res) => {
  try {
    let student = await Student.findOne({
      _id: req.params.id
    });

    let studentUser = await User.findOne({
      _id: student.student
    })
    student.price = req.body.price;
    student.lessonLength = req.body.lessonLength;

    studentUser.firstName = req.body.firstName;
    studentUser.lastName = req.body.lastName;
    studentUser.email = req.body.email;
    studentUser.gender = req.body.gender;

    await student.save();
    await studentUser.save();
    res.sendStatus(200);    
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', validateUser, async (req, res) => {
  try {
    await Student.deleteOne({
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
  model: Student
}