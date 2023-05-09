import { fork, all, takeLatest } from "redux-saga/effects"
import { createSubmitUserSaga } from "./submitUserSaga"
import { createGetProductsSaga } from "./getProductsSaga"
import { ReactReduxContext } from "react-redux"
import { useContext } from "react"

export function createRootSaga(apiServices, store) {
  const userSaga = createUserSaga(apiServices)
  const productsSaga = createProductSaga(apiServices, store)

  const sagas = [
    fork(userSaga),
    fork(productsSaga)
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

export function createProductSaga(apiServices, store) {
  const getProductsSaga = createGetProductsSaga(apiServices, store)

  return function* () {
    yield takeLatest('[product] get products', getProductsSaga)
  }
}