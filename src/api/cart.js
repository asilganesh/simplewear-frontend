import axios from "axios"
import lodash from "lodash"
import { SERVER_API } from "../Helper/serverUrl"
import useAuthManager from "../Composables/useAuthManager"



const injectheader = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    const token = data.token
    return token
}

export const fetcthCartDetailsAsync = async (userId) => {


    const headers=  {
        Authorization: `Bearer ${injectheader()}`, 
        'Content-Type': 'application/json'
    }

    return new Promise((resolve, reject) => {

        const data = { userId: userId }
        axios({
            method: "get",
            params: data,
            url: `${SERVER_API}/getCartItems`,
            headers: headers
        })
            .then((response) => {

                if (response.status !== 200) {
                    throw new Error("Failed to fetch cart details")
                }
                var responseBody = {
                    cartData: lodash.get(response, 'data', [])
                }

                return resolve(responseBody)
            })
            .catch((err) => {

                if (err.response) {
                    return reject(err.response.data.message)
                }
                return reject(err)
            })
    })
}

export const addItemToCartAsync = async (product) => {

    const headers=  {
        Authorization: `Bearer ${injectheader()}`, 
        'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {

        axios({
            method: "post",
            data: product,
            headers: headers,
            url: `${SERVER_API}/addToCart`
        })
            .then((response) => {

                if (response.status !== 201) {
                    throw new Error("Failed to add item to cart")
                }

                var responseBody = {
                    data: lodash.get(response, 'data', [])
                }
                return resolve(responseBody)
            })
            .catch((err) => {
                if (err.response) {
                    return reject(err.response.data.message)
                }
                return reject(err)
            })
    })
}

export const updateCartItemSizeAsync = async (updatedCartData) => {

    const headers=  {
        Authorization: `Bearer ${injectheader()}`, 
        'Content-Type': 'application/json'
    }

    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            data: updatedCartData,
            headers: headers,
            url: `${SERVER_API}/updateItemSize`
        })
            .then((response) => {

                if (response.status !== 200) {
                    throw new Error("Failed to update size")
                }

                var responseBody = {
                    data: lodash.get(response, "data", [])
                }
                return resolve(responseBody)
            })
            .catch((err) => {
                if (err.response) {
                    return reject(err.response.data.message)
                }
                return reject(err)
            })
    })
}

export const updateCartItemQuantityAsync = async ({ cartId, userId, newQuantity }) => {

    const headers=  {
        Authorization: `Bearer ${injectheader()}`, 
        'Content-Type': 'application/json'
    }

    const data = {
        cartId, userId, newQuantity
    }

    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            data: data,
            headers: headers,
            url: `${SERVER_API}/updateItemQuantity`
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed to update quantity")
                }

                var responseBody = {
                    data: lodash.get(response, 'data', [])
                }
                return resolve(responseBody)
            })
            .catch((err) => {
                if (err.response) {
                    return reject(err.response.data.message)
                }
                return reject(err)
            })
    })
}

export const clearCartAsync = async (userId) => {

    const headers=  {
        Authorization: `Bearer ${injectheader()}`, 
        'Content-Type': 'application/json'
    }

    return new Promise((resolve, reject) => {
        const data = { userId }

        axios({
            method: 'delete',
            data: data,
            headers: headers,
            url: `${SERVER_API}/clearCart`
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Failed to clear Cart")
                }

                return resolve(response)

            })
            .catch((err) => {
                return reject(err)
            })
    })
}

export const deleteItemFromCartAsync = async (cartItemId, userId) => {

    const data = {
        "cartId": cartItemId,
        userId
    }

    const headers=  {
        Authorization: `Bearer ${injectheader()}`, 
        'Content-Type': 'application/json'
    }

    return new Promise((resolve, reject) => {

        axios({
            method: "delete",
            data: data,
            headers: headers,
            url: `${SERVER_API}/removeItem`
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed to remove Item, Please try again")
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
                return reject(err)
            })
    })
}