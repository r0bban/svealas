import axios from 'axios';

const API_CHRISTMAS = axios.create({
    baseURL: `https://io-r0bban-api.herokuapp.com/christmas`
})

// const LOCAL_CHRISTMAS = axios.create({
//     baseURL: `localhost:8080/christmas`
// })

export default {
    authorizeParticipant(participantToken) {
        return API_CHRISTMAS.get("/" + participantToken)
            .then(response => response)
            .catch(error => {
                throw error
            })
    },
    getGift(giftToken) {
        return API_CHRISTMAS.get("/gift/" + giftToken)
            .then(response => response)
            .catch(error => {
                throw error
            })
    }
}