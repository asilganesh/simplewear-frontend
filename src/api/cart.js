import axios from "axios"
import lodash from "lodash"
import { SERVER_API } from "../Helper/serverUrl"


export const fetcthCartDetailsAsync = async(userId) => {

    return new Promise((resolve,reject) => {

        const data = {userId: userId}
        axios({
            method: "get",
            params: data,
            url :`${SERVER_API}/getCartItems`
        })
        .then((response) => {

            if(response.status !== 200){
                throw new Error("Failed to fetch cart details")
            }
            var responseBody={
                cartData : lodash.get(response,'data',[])
            }

            return resolve(responseBody)
        })
        .catch((err)=> {

            if(err.response) {
                return reject(err.response.data.message)
            }
            return reject(err)
        })
    })
}

export const addItemToCartAsync = async(product) => {
    return new Promise((resolve,reject) => {

        axios({
            method: "post",
            data: product,
            url : `${SERVER_API}/addToCart`
        })
        .then((response) => {

            if(response.status !== 201){
                throw new Error("Failed to add item to cart")
            }

            var responseBody = {
                data: lodash.get(response,'data',[])
            }
            return resolve(responseBody)
        })
        .catch((err) => {
            if(err.response) {
                return reject(err.response.data.message)
            }
            return reject(err)
        })
    })
}

export const deleteItemFromCartAsync = async(cartItemId,userId) => {

    const data = {
        "cartId": cartItemId,
        userId
    }

    return new Promise((resolve,reject) => {

        axios({
            method: "delete",
            data:data,
            url: `${SERVER_API}/removeItem`
        })
        .then((response) => {
            if(response.status !== 200) {
                throw new Error("Failed to remove Item, Please try again")
            }
            var responseBody={
                data: lodash.get(response,'data',[])
            }        
            
            return resolve(responseBody)
        })
        .catch(err => {
            if(err.response) {
                return reject(err.response.data.message)
            }
            return reject(err)
        })
    })
}