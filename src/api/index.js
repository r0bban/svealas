import axios from 'axios';

const API_AUTH = axios.create({
    baseURL: `http://localhost:8081/api/auth`
})

export default {
    authorizeUser(userCredentials) {
        return API_AUTH.post("/signin", userCredentials)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },
    createUser(userData, token) {
        return API_AUTH.post("/signup", userData,
            {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },
    validate(token) {
        return API_AUTH.get("/validate",
            {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    }
}
