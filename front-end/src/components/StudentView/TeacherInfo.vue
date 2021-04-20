<template>
  <div class='teacher-info'>
    <h4>Teacher: {{teacher.firstName}} {{teacher.lastName}}</h4>
    <h4>Student Since: {{student.startDate}}</h4>


  </div>

</template>

<script>
export default {
  name: "TeacherInfo",
  props: {
    teacher: Object,
    student: Object
  },
  data() {
    return {

    };
  },
  async created() {

  },
}
</script>

<style scoped>
.teacher-info {
  display: flex;
  flex-direction: column;
  
  align-items: flex-start;
}

</style>
