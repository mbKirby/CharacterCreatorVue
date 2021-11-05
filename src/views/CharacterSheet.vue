<template>
  <div id="cs" class="container text-center mt-3">
    <p>Click on the character you want to view.</p>
    <div :key="character" v-for="character in data">
      <router-link class="mt-2" :to="`/details/${character.name}`">
        {{ character.name }}
      </router-link>
    </div>
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
        url: "https://character-creator-drf.herokuapp.com/user/",
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
        url: "https://character-creator-drf.herokuapp.com/characters/",
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