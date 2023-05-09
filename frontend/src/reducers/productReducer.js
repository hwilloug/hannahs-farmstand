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
        default: 
            return state
    }
}