import { createSubmitUserApi } from "./submitUserApi"

export const createAPIServices = () => {
  return {
    submitUserApi: createSubmitUserApi(),
  }
}
