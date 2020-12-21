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
            state.currentParticipant = null;
            state.participantToken = null;
            localStorage.removeItem("currentParticipant");
        },
        setParticipantError(state, message) {
            state.participantError = message
        }
    },
    actions: {
        async authParticipant({ dispatch, commit }, participantToken) {
            try {
                const response = await christmasAPI.authorizeParticipant(participantToken);
                if (response.status == 202) {
                    commit("setParticipantError", response.data)
                } else {
                    commit("setParticipantError", null)
                    commit("setCurrentParticipant", response.data);
                    localStorage.currentParticipant = JSON.stringify(response);
                }
            } catch (error) {
                dispatch("handleParticipantError", error);
            }
        },
        handleParticipantError({ dispatch }, error) {
            dispatch("handleError", error)
        },
        handleError({ commit }, error) {
            commit("setParticipantError", error)
        },
        prepareParticipant({ commit }) {
            console.log("Action -> @store>prepareParticipant()");
            if (localStorage.getItem("currentParticipant")) {
                commit(
                    "setCurrentParticipant",
                    JSON.parse(localStorage.getItem("currentParticipant"))
                );
            }
        },
        resetParticipant({ commit }) {
            commit("clearCurrentParticipant");
        }
    },
    getters: {
        getGetParticipantName: state => {
            return state.currentParticipant ? state.currentParticipant.name : null;
        },
        getToBuyTo: state => {
            return state.currentParticipant ? state.currentParticipant.buyingToParticipant : null;
        },
        getGameName: state => {
            return state.currentParticipant ? state.currentParticipant.giftGame : null;
        }

    }
}

export default christmasModule