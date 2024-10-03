import axios from "axios"
import lodash from "lodash"

const fetchProductsAsync = () => {
    let productsData = new Promise((resolve,reject) => {

        axios({
            method: "get",
            url: "https://api.foreverbuy.in/api/product/list",
        })
        .then((response) => {

            if(response.status !== 200) {
                throw new Error("Failed to fetch products")
            }

            var responseBody = {
                products : lodash.get(response, "data.products",[])
            }

            return resolve(responseBody)
        })
        .catch((err)=>{
            return reject(err)
        })
    }) 

    return productsData
}

export default fetchProductsAsync