import axios from "axios";
export default axios.create({
    baseURL:'https://s8ux4vvov0.execute-api.us-east-1.amazonaws.com/prod',
    headers:{
        "content-type":"application/json"
    }
})
