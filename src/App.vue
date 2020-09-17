<template data-test="app">
  <div id="app" data-app >
    <Navbar />
    <router-view data-test="app"></router-view>
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch("checkLogin");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 100px;
  justify-content: center;
}
</style>
