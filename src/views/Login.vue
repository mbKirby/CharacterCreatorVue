<template>
  <div class="row justify-content-center">
    <form class="text-center col-6 border mt-2" v-on:submit.prevent="login">
      <p v-if="incorrectAuth">
        Incorrect username or password entered - please try again
      </p>
      <h2>Login</h2>
      <div class="form-group my-1">
        <input
          type="text"
          name="username"
          id="user"
          v-model="username"
          class="form-control"
          placeholder="Username"
        />
      </div>
      <div class="form-group my-1">
        <input
          type="password"
          name="password"
          id="pass"
          v-model="password"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <button class="btn-primary btn my-1" type="submit">Login</button>
      <div>
        <router-link class="my-1" to="sign-up"
          >No account sign up here.</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "CharacterCreation" });
        })
        .catch((err) => {
          console.log(err);
          this.incorrectAuth = true;
        });
    },
  },
};
</script>