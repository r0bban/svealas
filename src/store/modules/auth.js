import authAPI from "@/api";
const authModule = {
    state: () => ({
        currentUser: null,
        accessToken: null,
        authErrorCode: 0,
    }),
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles
            }
            state.accessToken = user.accessToken;
        },
        setAuthErrorCode(state, code) {
            state.authErrorCode = code;
        },
        clearCurrentUser(state) {
            state.currentUser = null;
            state.accessToken = null;
        }
    },
    actions: {
        authUser({dispatch, commit }, loginCredentials) {
            authAPI.authorizeUser(loginCredentials)
                .then(response => {
                    commit("setCurrentUser", response)
                    commit("closeLogin");
                    sessionStorage.currentUser = JSON.stringify(response);
                }
                ).catch(error => {
                    dispatch("handleAPIError", error)
                })
        },
        handleAPIError({ dispatch, commit }, error) {
            try {
                dispatch("handleUnauthorizd", error)
            } catch (error) {
                if(error.response){
                    commit("addError", `(${error.response.data.status}): ${error.response.data.message}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    commit("addError", `No response from server: ${error.request}`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    commit("addError", `Error: Unknown error have occurred. Please try again later.`)
                }
            }

        },
        handleUnauthorizd({commit }, error) {
            if (error.response.status == 401) {
                if (error.response.data.message == "Bad credentials") {
                    commit("setAuthErrorCode", 1)
                } else if (error.response.data.message == "Token is expired") {
                    commit("setAuthErrorCode", 2)
                    commit("openLogin")
                }
            } else {
                throw error
            }
        },
        prepareUser({ commit }) {
            console.log("Action -> @store>prepareUses()");
            if (sessionStorage.getItem("currentUser")) {
                commit(
                    "setCurrentUser",
                    JSON.parse(sessionStorage.getItem("currentUser"))
                );
                commit("closeLogin");
                // this.$store.commit(
                //     "setToken",
                //     JSON.parse(sessionStorage.getItem("userToken"))
                // );
            }
        },
        validate({dispatch, getters }) {
            authAPI.validate(getters.getAccessToken)
                .then(response => {
                    console.log(response);
                }
                ).catch(error => dispatch("handleAPIError", error))
        },
        logout({ commit }) {
            commit("clearCurrentUser")
            sessionStorage.removeItem("currentUser"),
                sessionStorage.removeItem("userToken");
            commit("openLogin")
        }
    },
    getters: {
        getAccessToken: state => {
            return state.accessToken;
        }
    }
}

export default authModule