import { createGetProductsApi } from "./getProductsApi"
import { createSubmitUserApi } from "./submitUserApi"
import { createGetProductApi } from "./getProductApi"

export const createAPIServices = () => {
  return {
    submitUserApi: createSubmitUserApi(),
    getProductsApi: createGetProductsApi(),
    getProductApi: createGetProductApi()
  }
}
