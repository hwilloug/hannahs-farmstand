import { createAction } from "./action"

export const productActions = (dispatch) => {
  return {
    getProducts: () => 
      dispatch(createAction('[product] get products', {})),
    getProduct: (product_id) =>
      dispatch(createAction('[product] get product'), {product_id}),
    setProducts: (products) =>
      dispatch(createAction('[product] set products', {products})),
    setProduct: (product) =>
      dispatch(createAction('[product] set product', {product})),
  }
}