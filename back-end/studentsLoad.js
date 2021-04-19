const mongoose = require('mongoose');
const users = require("./routes/users.js");
const students = require('./routes/students')
const mockData = require('./mock-data').mock;

const User = users.model;
const Student = students.model;

// connect to Mongo
mongoose.connect('mongodb://localhost:27017/creative4', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const teacher = {
  firstName: "test",
  lastName: 'test',
  email: 'test@test.com',
  password: 'test',
  gender: 'male',
  username:'test',
  role: 'teacher'
}

const load = async () => {
  let user = new User(teacher)
  await user.save();

  mockData.forEach(async item => {
    let studentUser = {
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      password: `${item.first_name}${item.last_name}`,
      gender: item.gender === 'F' ? 'female' : 'male',
      username: item.first_name,
    }

    let studentDb = new User(studentUser)
    await studentDb.save()

    const student = new Student({
      teacher: user,
      student: studentDb,
      price: item.billing_price,
      startDate: item.student_since,
      lessonLength: item.lesson_length
    })

    await student.save();
  })
}

load()//.then(() => {console.log('Success!')}).catch(err => console.log(err))