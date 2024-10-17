import axios from "axios"
import lodash from "lodash"
import { SERVER_API } from "../Helper/serverUrl"


 export const userRegistrationAsync = (userData) => {

    let data = new Promise((resolve,reject) => {

        axios({
            method: "POST",
            data: userData,
            url: `${SERVER_API}/registerUser`,

        })
        .then((response) => {

            if(response.status != 200){
                throw new Error ("Registraion Failed")
            }

            var responseBody =  {
                userDetails : lodash.get(response,"data",{})
            }

            return resolve(responseBody)

        })
        .catch((err) => {
           
            if (err.response) {
              
                console.log(err.response.data.message);
                return reject(err.response.data.message);  
            }
            return reject(err)
        })

    })

    return data
}

export const  userLoginAsync = (userData) => {

    const data = new Promise((resolve,reject) => {
        axios({
            method: 'POST',
            data: userData,
            url : `${SERVER_API}/userLogin`,
        })
        .then((response) => {

            if(response.status !== 200){
                throw new Error("Login Failed")
            }

            var responseBody = {
                userDetails: lodash.get(response,'data',{})
            }

            return resolve(responseBody)
        })
        .catch((err) => {
            if (err.response) {
              
                console.log(err.response.data.message);
                return reject(err.response.data.message);  
            }
            return reject(err)
        })
    })

    return data
}