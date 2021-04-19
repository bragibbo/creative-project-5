<template>
  <div class="dashboard">
    <div class="sidebar d-flex flex-column align-items-start">
      <router-link class="links text-left w-100" to='/' exact>Home</router-link>
      <router-link class="links text-left w-100" to='/students'>Students</router-link>
    </div>
    <div class="content">
      <div class="content-body mt-2 px-2 py-2">
        <router-view/>
      </div>
      <div class="content-footer">
        <p>Created by Brayden Gibbons and Nathan Sirrine. View the code for this project on <a href="https://github.com/bragibbo/creative-project-4">Github</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Home from '../components/Dashboard/Home'
import Students from '../components/Dashboard/Students'

export default {
  name: 'Dashboard',
  component: {
    Home, 
    Students
  }
}
</script>

<style scoped>
.router-link-active {
  background: var(--primaryGreen);
}

.dashboard {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}

.sidebar {
  background:  var(--primaryBlue);
  width: 200px;
}

.links {
  color: white;
  text-decoration: none;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 100%;
  width: 100%;
}

.content-footer {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  border-top: 1px solid gray;
  font-size: .75em;
  align-items: flex-start;
}

@media only screen and (max-width: 700px) {
  .sidebar {
    width: 120px;
  }
}
</style>