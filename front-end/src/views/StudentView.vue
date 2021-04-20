<template>
  <div class="page mx-4">
    <div class="content">
      <h1 class="title">My Account</h1>
      <div class="d-flex flex-column">
        <div class="student-info">
          <h4>
            Name: {{ studentInfo.student && studentInfo.student.firstName }}
            {{ studentInfo.student && studentInfo.student.lastName }}
          </h4>
          <h4>Email: {{ studentInfo.student && studentInfo.student.email }}</h4>
          <h4>
            Gender: {{ studentInfo.student && studentInfo.student.gender }}
          </h4>
          <TeacherInfo
            v-if="teacher"
            :teacher="teacher"
            :student="studentInfo"
          />
          <button
            class="btn btn-outline-primary"
            v-if="!areEditing"
            @click="toggleAreEditing"
          >
            Edit Info
          </button>
          <button
            class="btn btn-outline-primary"
            v-if="areEditing"
            @click="toggleAreEditing"
          >
            Hide Edit Info
          </button>
          <EditPersonalInfo
            v-if="areEditing && studentInfo"
            :student="studentInfo"
            @updated="updateData"
          />
        </div>
        <div class="mt-5">
          <AssignTeacher v-if="!teacher" @setTeacher="setStudentTeacher" />
        </div>
      </div>
    </div>

    <div class="mt-4 content-footer">
      <p>
        Created by Brayden Gibbons and Nathan Sirrine. This project took <strong>6 hours</strong>. View the code for this
        project on
        <a href="https://github.com/bragibbo/creative-project-5">Github</a>.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AssignTeacher from "../components/StudentView/AssignTeacher";
import TeacherInfo from "../components/StudentView/TeacherInfo";
import EditPersonalInfo from "../components/StudentView/EditPersonalInfo";

export default {
  name: "StudentView",
  components: {
    AssignTeacher,
    TeacherInfo,
    EditPersonalInfo,
  },
  data() {
    return {
      teacher: "",
      currentUser: {},
      studentInfo: {},
      areEditing: false,
    };
  },
  async created() {
    this.currentUser = this.$root.$data.user;
    await this.getStudentTeacher();
    await this.getStudent();
  },
  methods: {
    async setStudentTeacher(teacher) {
      try {
        const response = await axios.post("/api/students/teacher", {
          teacher: teacher,
        });
        await this.getStudentTeacher();
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
    async getStudentTeacher() {
      try {
        let response = await axios.get("/api/students/teacher");
        this.teacher = response.data.teacher;
      } catch (error) {
        this.teacher = "";
      }
    },
    async getStudent() {
      try {
        let response = await axios.get(
          "/api/students/get_student/" + this.currentUser._id
        );
        this.studentInfo = response.data.student;
      } catch (error) {
        this.studentInfo = {};
      }
    },
    toggleAreEditing() {
      this.areEditing = !this.areEditing;
    },
    async updateData() {
      await this.getStudentTeacher();
      await this.getStudent();
      this.areEditing = !this.areEditing;
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 2rem;
}

.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  width: 100%;
}

.content-footer {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  border-top: 1px solid gray;
  font-size: 0.75em;
  align-items: flex-start;
}

.student-info {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  margin-left: 2rem;
}
</style>
