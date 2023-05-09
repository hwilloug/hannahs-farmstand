import { call, put } from "redux-saga/effects"
import { productActions } from '../actions/productActions'

export function createGetProductsSaga(apiServices, store) {
    return function* getProductsSaga() {
        try {
            const response = yield call(apiServices.getProductsApi)
            yield put(productActions(store.dispatch).setProducts(response))
        } catch (e) {
            console.log('there was an error', e)
        }
    }
}