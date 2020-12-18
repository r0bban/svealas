<template>
  <main class="game-background">
    <div v-if="this.showVerifyToken" class="login">
      <form class="form" onsubmit="return false">
        <div class="form-row">
          <!-- <label class="label" for="token">Nyckel: </label> -->
          <input
            class="input"
            v-model="token"
            type="text"
            id="token"
            placeholder="ange kod"
          />
        </div>
        <div class="std-btn">
          <button id="token-btn" :disabled="this.loading" @click="verify">
            Verifiera
          </button>
        </div>
      </form>
    </div>

    <img src="@/assets/loader.png" v-if="this.loading" />
    <div
      v-if="this.partisipantExist && !this.loading"
      class="participant-container"
    >
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
      <button
        v-if="this.showRecipient && toBuyToExist"
        @click="toggleShowRecipient"
      >
        Dölj julklappsmottagare
      </button>
      <button v-if="this.showRecipient && !toBuyToExist" @click="verify">
        Kolla igen
      </button>
      <button id="clear-btn" @click="clear">
        Rensa kod från minnet
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Participant",
  data() {
    return {
      token: null,
      identifierad: false,
      showRecipient: false,
      loading: false,
    };
  },
  methods: {
    async verify() {
      this.loading = true;
      await this.$store.dispatch("authParticipant", this.token);
      this.loading = false;
    },
    toggleShowRecipient() {
      this.showRecipient = !this.showRecipient;
    },
    clear() {
      this.token = null;
      this.$store.dispatch("resetParticipant");
    },
  },
  computed: {
    showVerifyToken(){
      return (!this.partisipantExist && !this.loading)
    },
    partisipantExist() {
      return this.$store.state.christmasModule.currentParticipant
        ? this.$store.state.christmasModule.currentParticipant.name
        : false;
    },
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
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgb(150, 12, 40);
  top: 0;
  width: 100%;
  height: 100%;
}
.form,
.form-row {
  display: inherit;
  flex-direction: column;
  margin: 15px 0;
}

.input {
  color: black;
  font-size: 1.2em;
  border: 0;
  border-radius: 3px;
  text-align: center;
  height: 30px;
}

#token-btn {
  width: 100%;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  height: 3rem;
  border: 0;
  border-radius: 50px;
  // font: 700 1.5rem $primary-font;
  color: black;
  background: white;
  font-weight: bolder;
  font-size: 1.3em;
}

#clear-btn {
  margin-top: 20px;
  width: 100%;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  height: 3rem;
  border: 2px solid gray;
  border-radius: 50px;
  color: gray;
  background: black;
  font-weight: bolder;
  font-size: 1.3em;
}

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
  text-align: center;
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
.recipient-container {
  text-align: center;
  border: whitesmoke;
  border-style: dashed;
  border-width: 2px;
  min-height: 120px;
  width: 98%;
  margin-bottom: 20px;
}
</style>