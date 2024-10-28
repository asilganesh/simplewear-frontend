import axios from "axios"
import lodash from "lodash"
import { SERVER_API } from "../Helper/serverUrl"

export const fetchProductByIdAsync = (productId) => {
    let productData = new Promise((resolve,reject) => {

        axios({
            method: "get",
            url: `${SERVER_API}/products/${productId}`
        })
        .then((response) => {
            if(response.status !==200) {
                throw new Error("Failed to fetch product details")
            }

            var responseBody = {
                productDetails : lodash.get(response,"data",{})
            }

           return  resolve(responseBody)
        })
        .catch((err) => {
            return reject(err)
        })
    })

    return productData
}



const fetchProductsAsync = ({queryParams}) => {
    let productsData = new Promise((resolve,reject) => {

      
        axios({
            method: "get",
            params: queryParams,
            url: `${SERVER_API}/products`,
        })
        .then((response) => {

            if(response.status !== 200) {
                throw new Error("Failed to fetch products")
            }
            
            var responseBody = {
                products : lodash.get(response, "data",[])
            }

            return resolve(responseBody)
        })
        .catch((err)=>{
            console.log(err)
            return reject(err)
        })
    }) 

    return productsData
}


export default fetchProductsAsync


export const addProductAsync =  (product) => {

    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWExM2ZmMWRlYTQ3MWI1Zjk3OWY4MyIsIm5hbWUiOiJhZG1pbiIsIm1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3Mjk3NjU1NDF9.08TdVZ0r0FHTN7dNULgV12NIB4bH6xOep5B-91qavO8",
        'Content-Type': 'application/json'
    }

    return new Promise((resolve,reject) => {
        axios({
            method:"post",
            url:`${SERVER_API}/addProduct`,
            header:headers,
            data:product
        })
        .then(response => {

            if(response.status !== 201 ){
                throw new Error("Failed to add the product")
            }

            var responsebody = {
                data:lodash.get(response,'data',[])
            }

            return resolve(responsebody)
        })
        .catch(err=>{
            console.log(err)
        })
    })

}