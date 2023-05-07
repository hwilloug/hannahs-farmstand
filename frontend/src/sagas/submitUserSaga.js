import { call } from "redux-saga/effects"

export function createSubmitUserSaga(apiServices) {
    return function* submitUserSaga(action) {
        const {firstName, lastName, username, password} = action.payload.userInformation
        try {
            const response = yield call(
                apiServices.submitUserApi,
                {
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    password
                }
            )
        } catch (e) {
            console.log('there was an error', e)
        }
    }
}