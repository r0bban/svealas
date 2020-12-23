<template>
  <main class="gift-wrapper">
    <p class="gift-recipient-error" v-if="giftRecipientError">{{ giftRecipientError }}</p>

    <section v-if="giftRecipient && showIntro" class="intro">
      <h2>En riktigt </h2>
      <h2>God Jul {{ giftRecipient.name }}</h2>
      <p>önskar</p>
      <p>{{ giftRecipient.giver }}</p>
      <button class="btn gift" @click="closeIntro">Hämta min julklapp</button>
    </section>

    <section v-if="giftRecipient && !showIntro && !showGift && !showResponse" class="riddle-container">
      <h3 class="riddle-header">{{ currentRiddle.header }}</h3>
      <div class="option-container">
        <article v-for="option in currentRiddle.options" :key="option.title" @click="nextRiddle(option.correct)">
          <img class="option-img" :style="{objectFit:currentRiddle.objectFit}" :src="require('@/assets/riddles/' + option.img)"/>
          <p>{{ option.title }}</p>
        </article>
      </div>
      <!-- <button class="gift-btn" @click="nextRiddle">Next Riddle</button> -->
    </section>

    <section v-if="giftRecipient && showResponse" class="response">
      <div v-if="!responseCorrect" @click="closeResponse" class="no">
        <img class="response-img" :src="require('@/assets/riddles/no' + currentNo + '.gif')"/>
        <!-- <p class="response-text no">Leden {{ giftRecipient.name }}!</p> -->
      </div>
      <div v-if="responseCorrect" @click="closeResponse" class="yes">
        <p class="response-text yes">Helt rätt!</p>
        <img class="response-img" :src="require('@/assets/riddles/yes' + currentYes + '.gif')"/>
        <p class="response-text yes">Snyggt {{ giftRecipient.name }}!</p>
      </div>
    </section>

    <section v-if="giftRecipient && showGift" class="gift">
        <img class="response-img" @click="openGift" :src="require('@/assets/gift-box.svg')"/>
        <p>Klicka på paketet för att öppna julklappen</p>
      <!-- {{ giftRecipient.giftUrl }} -->
    </section>
  </main>
</template>

<script>
export default {
  name: "ChristmasGift",
  data() {
    return {
      showGift: false,
      showResponse: false,
      responseCorrect: false,
      currentYes: 1,
      currentNo: 1,
      // validationText: null,
      showIntro: true,
      // riddleComplete: false,
      currentRiddleIndex: 0,
      riddleList: [
        {
          objectFit: "contain",
          header: "Vilka är bäst?",
          options: [
            {
              title: "Brynäs",
              img: "bif_.png",
              correct: true,
            },
            {
              title: "Timrå",
              img: "tik_.png",
              correct: false,
            },
          ],
        },
        {
          objectFit: "cover",
          header: "Vem är bäst?",
          options: [
            {
              title: "Pappa",
              img: "andreas.jpg",
              correct: false,
            },
            {
              title: "Farbror",
              img: "robert.jpg",
              correct: true,
            },
          ],
        },
      ],
      loading: false,
    };
  },
  props: {
    giftToken: String,
  },
  created() {
    console.log("Params --->" + JSON.stringify(this.$route.params))
    if (this.giftToken) {
      // this.token = this.participantToken;
      this.verify();
    }
  },
  methods: {
    async verify() {
      this.loading = true;
      await this.$store.dispatch("authGiftToken", this.giftToken);
      this.loading = false;
    },
    openGift(){
      location.href= this.giftRecipient.giftUrl;
    },
    closeIntro() {
      this.showIntro = false;
    },
    closeResponse(){
      this.showResponse = false;
    },
    openResponse(result){
      this.responseCorrect = result;
      if(result){
        this.currentYes = (this.currentYes == 1) ? 2 : 1;
        console.log(this.currentYes);
      } else {
        this.currentNo = (this.currentNo == 1) ? 2 : 1;
        console.log(this.currentNo);
      }
      this.showResponse = true;
    },
    nextRiddle(result) {
      console.log(result);
      this.openResponse(result);

      if (result && this.riddleList.length - 1 > this.currentRiddleIndex) {
        this.currentRiddleIndex++;
      } else if(result){
        this.showGift = true;
      }
    },
  },
  computed: {
    currentRiddle() {
      return this.riddleList[this.currentRiddleIndex];
    },
    giftRecipient() {
      return this.$store.state.christmasModule.giftRecipient;
    },
    giftRecipientError() {
      return this.$store.state.christmasModule.giftRecipientError;
    },
    showVerifyToken() {
      return !this.partisipantExist && !this.loading;
    },
  },
};
</script>
<style lang="scss" scoped>

.gift-recipient-error {
  display: inherit;
  background: black;
  color: yellow;
  width: 100%;
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
}

.gift-wrapper{
  position: relative;
}
.gift-wrapper, section{
  margin: 0 auto;
  background: rgb(150, 12, 40);
  overflow: auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 600px;
  width: 100%;
  padding: 2vw;
  box-sizing: border-box;
  justify-content: center;
}

section *{
  text-align: center;
  color: whitesmoke;
  text-shadow: 2px 2px black;
}

.intro h2{
  font-size: 3rem;
  margin: 0.2rem;
}

.intro p{
  font-size: 2.5rem;
  margin: 0.2rem;
}

.btn {
  width: 100%;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  height: 3rem;
  border: 0;
  border-radius: 50px;
  // font: 700 1.5rem $primary-font;
  color: rgb(150, 12, 40);
  background: white;
  font-weight: bolder;
  font-size: 1.3em;
  text-shadow: none;
  margin-top: 20px;
}

.riddle-header{
  font-size: 2rem;
}

.option-container{
  display: flex;
  justify-content: space-around;
}

.option-container > article{
  width: 40%;
}

.option-container > article > img {
  width: 100%;
  height: 200px;
  // object-fit: contain;
}

.response {
  position: absolute;
  // top: 0;
  left: 0;
  padding: 0;
  height: 100%;
}
.response > div {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: black;
  justify-content: center;
  font-size: 2rem;
}
.response img {
  width: 100%;
  height: 50%;
  object-fit: cover;
}
</style>