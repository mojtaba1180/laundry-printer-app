import axios from 'axios'


const http = axios.create({
    baseURL: 'http://localhost:8080/api', // set api url in axios base config 
    timeout: 1000 * 10,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
})

export default http