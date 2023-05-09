import { call, put } from "redux-saga/effects"
import { productActions } from '../actions/productActions'

export function createGetProductSaga(apiServices, store) {
    return function* getProductSaga(action) {
        try {
            const response = yield call(
                apiServices.getProductApi,
                action.payload.productId
            )
            yield put(productActions(store.dispatch).setProduct(action.payload.productId, response))
        } catch (e) {
            console.log('there was an error', e)
        }
    }
}