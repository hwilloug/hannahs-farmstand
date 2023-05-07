import { createAction } from "./action"

export const userActions = (dispatch) => {
  return {
    signUp: (userInformation) => 
    dispatch(createAction('[user] sign-up', {
      userInformation
    }))
  }
}