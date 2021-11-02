<template>
  <div class="container">
    <p>you made it</p>
    <div :key="character" v-for="character in data">
      <router-link :to="`/details/${character.name}`">
        {{ character.name }}
      </router-link>
    </div>

    <button @click="testing()">test</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  computed: mapState(["data", "test"]),
  methods: {
    testing() {
      this.getUser();
      console.log(this.test);
    },
    getUser() {
      axios({
        method: "get",
        url: "http://127.0.0.1:5050/user/",
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
      })
        .then((response) => {
          this.$store.state.test = response.data;
          console.log(this.test);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getUser(),
      axios({
        method: "get",
        url: "http://127.0.0.1:5050/characters/",
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
      })
        .then((response) => {
          this.$store.state.data = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>