<template>
  <main class="game-background">
    <img src="@/assets/loader.png" v-if="this.loading" />
    <div v-else class="participant-container">
      <h1>{{ gameName }}</h1>
      <h2>Hej {{ participantName }}!</h2>
      <p>Här ser du vem du ska köpa julklapp till i {{ gameName }}.</p>
      <p>Julklppen ska kosta mellan 200-230 kr.</p>
      <article class="recipient-container">
        <div v-if="this.showRecipient" class="recipient">
          <h3>Grattis, du ska köpa julklapp till:</h3>
          <h2 v-if="toBuyToExist">{{ toBuyToName }}</h2>
          <h2 v-else>Oh nej, ej klart ännu 😢</h2>
        </div>
      </article>
      <button v-if="!this.showRecipient" @click="toggleShowRecipient">
        Se julklappsmottagare
      </button>
      <button v-if="this.showRecipient" @click="toggleShowRecipient">
        Dölj julklappsmottagare
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      showRecipient: false,
      loading: false,
    };
  },
  methods: {
    toggleShowRecipient() {
      this.showRecipient = !this.showRecipient;
    },
    update() {
      this.$store.dispatch(
        "authParticipant",
        this.$route.params.participantToken
      );
    },
  },
  computed: {
    participantName() {
      return this.$store.state.christmasModule.currentParticipant
        ? this.$store.state.christmasModule.currentParticipant.name
        : "";
    },
    toBuyToExist() {
      return this.$store.state.christmasModule.currentParticipant
        .buyingToParticipant
        ? true
        : false;
    },
    toBuyToName() {
      return this.$store.state.christmasModule.currentParticipant
        ? this.$store.state.christmasModule.currentParticipant
            .buyingToParticipant
        : "";
    },
    gameName() {
      return this.$store.state.christmasModule.currentParticipant
        ? this.$store.state.christmasModule.currentParticipant.giftGame
        : "";
    },
  },
  async created() {
    console.log("created!");
    this.loading = true;
    await this.$store.dispatch(
      "authParticipant",
      this.$route.params.participantToken
    );
    this.loading = false;
    // }
    //   console.log("created!");
    //   this.$store.dispatch(
    //     "authParticipant",
    //     this.$route.params.participantToken
    //   );
  },
};
</script>
<style lang="scss" scoped>
.body {
  background: green;
}
.game-background {
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    width: 100%;
  height: 100vh;
  // padding: 20px;
    background: rgb(216, 73, 73);
}
.participant-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  color: whitesmoke;
  width: 100%;
  height: 100%;
  padding: 20px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.recipient-container{
  text-align: center;
  border: whitesmoke;
  border-style: dashed;
  border-width: 2px;
  min-height: 120px;
  width: 98%;
  margin-bottom: 20px;
}
</style>