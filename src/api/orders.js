import axios from "axios"
import { SERVER_API } from "../Helper/serverUrl"
import lodash from "lodash"


const injectheader = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    const token = data.token
    return token
}

export const fetchOrdersAsync = async (userId) => {
    const headers = {
        Authorization: `Bearer ${injectheader()}`,
        'Content-Type': 'application/json'
    }

    return new Promise((resolve, reject) => {
        const data = {userId}

        axios({
            method: 'get',
            params:data,
            headers: headers,
            url: `${SERVER_API}/getOrders`
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch orders")
                }

                var responseBody = {
                    data: lodash.get(response, 'data', [])
                }

                return resolve(responseBody)
            })
            .catch(err => {

                if (err.response) {
                    return reject(err.response.data.message)
                }
                reject(err)
            })
    })
}