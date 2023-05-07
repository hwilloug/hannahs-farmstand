import { fork, all, takeLatest } from "redux-saga/effects"
import { createSubmitUserSaga } from "./submitUserSaga"

export function createRootSaga(apiServices) {
  const userSaga = createUserSaga(apiServices)

  const sagas = [
    fork(userSaga)
  ]

  return function* () {
    yield all(sagas)
  }
}

export function createUserSaga(apiServices) {

  const submitUserSaga = createSubmitUserSaga(apiServices)

  return function* () {
    yield takeLatest('[user] sign-up', submitUserSaga)
  }
}