<template>
  <div class="row justify-content-center">
    <form class="text-center col-6 border mt-2" v-on:submit.prevent="signup">
      <p v-if="!match">Your Password doesn't match please try again.</p>
      <h2>SignUp</h2>
      <div class="form-group my-1">
        <input
          type="text"
          name="username"
          id="username"
          v-model="username"
          class="form-control"
          placeholder="Username"
        />
      </div>
      <div class="form-group my-1">
        <input
          type="password"
          name="password1"
          id="password1"
          v-model="password1"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <div class="form-group my-1">
        <input
          type="password"
          name="password2"
          id="password2"
          v-model="password2"
          class="form-control"
          placeholder="Re-enter password"
        />
      </div>
      <button class="btn-primary btn my-1" type="submit">Sign Up</button>
      <div>
        <router-link class="my-1" to="login"
          >Already have an account sign in here.</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",

  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      match: true,
    };
  },
  methods: {
    matched() {
      if (this.password1 === this.password2) {
        return true;
      } else {
        match = false;
        return false;
      }
    },
    signup() {
      if (this.matched()) {
        axios({
          method: "post",
          url: "http://127.0.0.1:5050/create/",
          data: {
            username: this.username,
            password: this.password1,
          },
        }).then(() => this.$router.push({ name: "login" }));
      }
    },
  },
};
</script>