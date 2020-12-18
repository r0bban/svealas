<template>
  <div class="header">
    <div class="std-btn">
      <button @click="login">Logga in</button>
    </div>
    <p>{{ this.getEmail }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      creds: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("authUser", this.creds);
    },
  },
  computed: {
    firstName() {
      return this.$store.state.authModule.currentUser.firstName;
    },
    isLoggedIn() {
      return this.$store.state.authModule.currentUser ? true : false;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: coral;
  position: fixed;
  top: 0;
  width: min-content;
  height: 100%;
}
</style>