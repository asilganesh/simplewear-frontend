import axios from "axios"
import { SERVER_API } from "../Helper/serverUrl"
import lodash from "lodash"


const injectheader = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    const token = data.token
    return token
}

export const fetchAllOrdersAsync = async() => {
    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWExM2ZmMWRlYTQ3MWI1Zjk3OWY4MyIsIm5hbWUiOiJhZG1pbiIsIm1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3Mjk3NjU1NDF9.08TdVZ0r0FHTN7dNULgV12NIB4bH6xOep5B-91qavO8",
        'Content-Type': 'application/json'
    }

    return new Promise((resolve,reject) => {

        axios({
            method: "get",
            url: `${SERVER_API}/getAllOrders`,
            headers: headers,

        })
        .then(response=>{
            if(!response.status ===200){
                throw new Error("Failed to fetch all orders")
            }

            var responseBody = {
                data: lodash.get(response,'data',[])
            }

          return  resolve(responseBody)
        })
        .catch(err => {
            if (err.response) {
                return reject(err.response.data.message)
            }
            reject(err)
        })
    })
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

export const addOrdersAsync = async(orderData) => {
    const headers = {
        Authorization: `Bearer ${injectheader()}`,
        'Content-Type': 'application/json'
    }

    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            data: orderData,
            url: `${SERVER_API}/addOrders`
        })
        .then((response) => {
            if(response.status !== 201){
                throw new Error("Failed to add orders")
            }

            var responseBody = {
                data: lodash.get(response,'data',{})
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

export const updateOrdersAsync =async(data) => {
    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWExM2ZmMWRlYTQ3MWI1Zjk3OWY4MyIsIm5hbWUiOiJhZG1pbiIsIm1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3Mjk3NjU1NDF9.08TdVZ0r0FHTN7dNULgV12NIB4bH6xOep5B-91qavO8",
        'Content-Type': 'application/json'
    }

    return new Promise((resolve,reject) => {
        axios({
            method: 'put',
            url: `${SERVER_API}/updateOrder`,
            headers:headers,
            data
        })
        .then(response=>{
            if(response.status!== 200) {
                throw new Error("Failed to update Order")
            }

            var responseBody = {
                data:lodash.get(response,'data',[])
            }

            return resolve(responseBody)
        })
        .catch(err => {
            if (err.response) {
                return reject(err.response.data.message)
            }
           return reject(err)
        })
    })
}
