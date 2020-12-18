import axios from 'axios';

const API_CHRISTMAS = axios.create({
    baseURL: `https://io-r0bban-api.herokuapp.com/christmas`
})

export default {
    authorizeParticipant(participantToken) {
        return API_CHRISTMAS.get("/"+participantToken)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    }
}