<template>
  <div>
    <Navbar></Navbar>
    <router-view />
  </div>
</template>


<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap";
</style>
