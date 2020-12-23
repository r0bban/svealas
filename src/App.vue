<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
    <LoginComponent v-if="showLogin" />
  </div>
</template>
<script>
import LoginComponent from "@/components/LoginComponent.vue";
export default {
  data() {
    return {};
  },
  components: {
    LoginComponent,
  },
  methods: {
    // beforeCreate() {
    //   this.$store.dispatch("initialProductLoad");
    // },
  },
  computed: {
    showLogin() {
      return this.$store.state.showLogin;
    },
  },
  created() {
    console.log("created!");
    this.$store.dispatch("prepareUser");
    this.$store.dispatch("prepareParticipant");  
  },
};
</script>
<style lang="scss">


// body {
//   margin: 0;
//   min-height: 100%;
// }
html {
  height: -webkit-fill-available;
}
body {
  min-height: 100vh;
  height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
  margin: 0;
  background: gray;
}


#app {
  min-height: 100%;
  height: 100%;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
