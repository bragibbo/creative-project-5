<template>
  <div class="card my-1 grid-container">
    <div class="time-slot grid-item">{{hourData.hour}}</div>
    <div class="grid-item">
      <div class="d-flex flex-column w-100">
        <div class="grid-container-names my-2" v-for="item in hourData.appointments" :key="JSON.stringify(item)">
          <div class="d-flex flex-column align-items-start">{{item.student.firstName}} {{item.student.lastName}}</div>
          <div class="delete-button grid-items">
            <button class="btn btn-outline-danger" @click="(index) => submit(item)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    hourData: Object
  },
  methods: {
    async submit(item) {
      try {
        axios.delete('/api/schedule/' + item._id)
        this.$emit('delete')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid var(--primaryGreen);
  box-shadow: 0px 1px 5px;
}

.time-slot{
  margin: 1px;
  min-height: 75px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 20px;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-container-names {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 20px;
}

.delete-button {
  width: 50px;
  height: 50px;
}
</style>