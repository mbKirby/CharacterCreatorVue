<template>
  <div class="container">
    <div>
      <img
        style="height: auto"
        class="img-fluid"
        src="https://github.com/mbKirby/CharacterCreator/blob/main/character_creator_vue/src/assets/navbarpic.jpg?raw=true"
        alt="party inside tavern"
      />
    </div>
    <nav class="col-12 navbar navbar-expand-lg navbar-light bg-light">
      <div class="col-12">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"></a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="col-12 justify-content-evenly navbar-nav">
              <li class="nav-item">
                <router-link to="/">Create Character</router-link>
              </li>

              <li v-if="!this.$store.getters.loggedIn" class="nav-item">
                <router-link to="login">Login</router-link>
              </li>

              <li v-if="!this.$store.getters.loggedIn" class="nav-item">
                <router-link to="sign-up">Sign Up</router-link>
              </li>

              <li v-if="this.$store.getters.loggedIn" class="nav-item">
                <router-link to="/character-sheet">Characters</router-link>
              </li>

              <li v-if="this.$store.getters.loggedIn" class="nav-item">
                <router-link to="/logout">Logout</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  computed: mapState(["data"]),
  methods: {
    logout() {
      this.$router.push({ name: "logout" });
    },
  },
  created() {},
};
</script>