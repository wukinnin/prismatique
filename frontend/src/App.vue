<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <h1>Prismatique</h1>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #3498db;
  padding: 1rem;
  color: white;
}
</style> -->