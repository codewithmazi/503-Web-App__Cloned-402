import axios from "axios";
export default axios.create({
    baseURL:'https://v4mqw4wyt0.execute-api.us-east-1.amazonaws.com',
    headers:{
        "content-type":"application/json"
    }
})
