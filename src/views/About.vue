<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="validate">Validate</button>
    <button @click="logout">Logout</button>

    <form class="form" onsubmit="return false">
      <h1 class="header">test</h1>
      <div class="formRow">
        <label class="label" for="username">Användare: </label>
        <input class="input" type="text" placeholder="testTxt"/>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inloggningsuppg: {
        username: "superadmin",
        password: "BOBbo9tti!",
      },
    };
  },
  methods: {
    validate() {
      this.$store.dispatch("validate");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
