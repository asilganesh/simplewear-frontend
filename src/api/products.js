import axios from "axios"
import lodash from "lodash"
import { SERVER_API } from "../Helper/serverUrl"

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