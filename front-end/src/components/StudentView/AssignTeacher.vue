<template>
  <div class="d-flex flex-column align-items-center w-100">
    <h3>Select Teacher</h3>
    <p class="w-50">
      <em
        >Please select your teacher from the drop down menu. This will ensure
        that your teacher is able to find your in their list.</em
      >
    </p>
    <v-select
      id="teacher-select"
      class="w-50 my-1"
      v-model="selectedTeacher"
      :get-option-label="(option) => `${option.firstName} ${option.lastName}`"
      :options="teachers"
    />
    <div v-if="errors.length > 0">
      <div
        class="d-flex flex-column input"
        v-for="(error, index) in errors"
        :key="index"
      >
        <div class="errors">{{ error }}</div>
      </div>
    </div>
    <button @click="submit" class="btn btn-outline-primary w-25 mt-4">
      Confirm Teacher
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AssignTeacher",
  data() {
    return {
      teachers: [],
      selectedTeacher: "",
      errors: []
    };
  },
  async created() {
    try {
      let response = await axios.get("/api/students/teachers");
      this.teachers = response.data.teachers;
    } catch (error) {
      this.teacher = [];
    }
  },
  methods: {
    async submit() {
      this.errors = [];
      if (!this.selectedTeacher) {
        if (!this.selectedTeacher) this.errors.push("Must select a teacher");
      } else {
        this.$emit("setTeacher", this.selectedTeacher);
        this.selectedTeacher = "";
      }
    },
  },
};
</script>

<style scoped>
.errors {
  color: red;
}
</style>
