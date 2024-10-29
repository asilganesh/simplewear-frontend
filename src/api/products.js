import axios from "axios"
import lodash from "lodash"
import { SERVER_API } from "../Helper/serverUrl"

export const getAdminToken = () => {
   const token=  JSON.parse(localStorage.getItem('adminInfo'))
   console.log(token)
   return token.token
}

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
        Authorization: `Bearer ${getAdminToken()}`,
        'Content-Type': 'application/json'
    }
    
    return new Promise((resolve,reject) => {
        axios({
            method:"post",
            url:`${SERVER_API}/addProduct`,
            headers:headers,
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
            return reject(err)
        })
    })

}

export const deleteProductAync = (productId) => {

    const headers = {
        Authorization: `Bearer ${getAdminToken()}`,
        'Content-Type': 'application/json'
    }

    return new Promise((resolve, reject) => {

        axios({
            method: "delete",
            url : `${SERVER_API}/deleteProduct`,
            headers,
            data:{productId: productId}
        })
        .then(response => {
            if(response.status !== 200) {
                throw new Error("Failed to delete product")
            }

            var responseBody = {
                data : lodash.get(response, 'data', [])
            }

            return resolve(responseBody)
        })
        .catch(err =>{
            return reject(err)
        })
    })

}