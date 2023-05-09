import { createGetProductsApi } from "./getProductsApi"
import { createSubmitUserApi } from "./submitUserApi"

export const createAPIServices = () => {
  return {
    submitUserApi: createSubmitUserApi(),
    getProductsApi: createGetProductsApi()
  }
}
