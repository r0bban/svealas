import christmasAPI from "@/api/christmas";
const christmasModule = {
    state: () => ({
        currentParticipant: null,
        participantToken: null,
        reveald: false,
        participantError: null
    }),
    mutations: {
        setCurrentParticipant(state, participant) {
            state.currentParticipant = {
                id: participant.id,
                giftGame: participant.giftGame,
                name: participant.name,
                token: participant.token,
                buyingToParticipant: participant.buyingToParticipant
            }
            state.participantToken = participant.token;
        },
        setRevealdStatus(state, status) {
            state.reveald = status;
        },
        clearCurrentParticipant(state) {
            state.CurrentParticipant = null;
            state.participantToken = null;
        },
        setParticipantError(state, message) {
            state.participantError = message
        }
    },
    actions: {
        async authParticipant({ dispatch, commit }, participantToken) {
            christmasAPI.authorizeParticipant(participantToken)
                .then(response => {
                    commit("setCurrentParticipant", response)
                    // commit("closeLogin");
                    sessionStorage.CurrentParticipant = JSON.stringify(response);
                }
                ).catch(error => {
                    dispatch("handleParticipantError", error)
                })
        },
        handleParticipantError({ dispatch }, error) {
            dispatch("handleError", error)
        },
        handleError({ commit }, error) {
            commit("setParticipantError", error.data)
        },
        // prepareUser({ commit }) {
        //     console.log("Action -> @store>prepareUses()");
        //     if (sessionStorage.getItem("CurrentParticipant")) {
        //         commit(
        //             "setCurrentParticipant",
        //             JSON.parse(sessionStorage.getItem("CurrentParticipant"))
        //         );
        //         commit("closeLogin");
        //         // this.$store.commit(
        //         //     "setToken",
        //         //     JSON.parse(sessionStorage.getItem("userToken"))
        //         // );
        //     }
        // },
        // validate({ dispatch, getters }) {
        //     christmasAPI.validate(getters.getAccessToken)
        //         .then(response => {
        //             console.log(response);
        //         }
        //         ).catch(error => dispatch("handleAPIError", error))
        // },
        // logout({ commit }) {
        //     commit("clearCurrentParticipant")
        //     sessionStorage.removeItem("CurrentParticipant"),
        //         sessionStorage.removeItem("userToken");
        //     commit("openLogin")
        // }
    },
    getters: {
        getGetParticipantName: state => {
            return state.currentParticipant.name;
        },
        getToBuyTo: state => {
            return state.currentParticipant.buyingToParticipant;
        },
        getGameName: state => {
            return state.currentParticipant.giftGame;
        }

    }
}

export default christmasModule