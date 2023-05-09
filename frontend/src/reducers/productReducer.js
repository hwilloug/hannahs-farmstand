const initialState = {}

export function productsReducer(
    previousState,
    action
) {
    const state = previousState || initialState
    switch (action.type) {
        case '[product] set products':
            return {
                ...state,
                allProducts: action.payload.products
            }
        case '[product] set product':
            return {
                ...state,
                productDetail: {
                    ...state.productDetail,
                    [action.payload.productId]: action.payload.productDetail
                }
            }
        default: 
            return state
    }
}