<template>
  <div class="home">
    <h1>Home</h1>
    <Schedule/>
  </div>
</template>

<script>
import Schedule from './Schedule/Schedule.vue'

export default {
  name: 'Home',
  components: {
    Schedule
  }
}
</script>

<style scoped>
.home {
  min-height: 100%;
}
</style>