import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'
import mock from './mock-data'
import mockSchedule from './mock-schedule'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('v-select', vSelect)

Vue.config.productionTip = false

let data = {
  schedule: mockSchedule,
  students: mock,
  user: null,
  remove(student) {
    this.students = this.students.filter(currStudent => currStudent.id != student.id);
  },
  addStudent(firstName, lastName, studEmail, billPrice, studGender, lessonLength, studSince) {
    this.students.push({
      id: (this.getLastID() + 1),
      first_name: firstName,
      last_name: lastName,
      email: studEmail,
      billing_price: billPrice,
      gender: studGender,
      lesson_length: lessonLength,
      student_since: studSince
    })
  },
  saveStudent(id, firstName, lastName, studEmail, billPrice, studGender, lessonLength) {
    this.students.forEach(element => {
      if (element.id === id) {
        element.id = id;
        element.first_name = firstName;
        element.last_name = lastName;
        element.email = studEmail;
        element.billing_price = billPrice;
        element.gender = studGender;
        element.lesson_length = lessonLength;
      }
      
    });
  },
  getLastID() {
    return this.students[(this.students.length) - 1].id;
  }
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
