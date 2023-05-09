import { createAction } from "./action"

export const productActions = (dispatch) => {
  return {
    getProducts: () => 
      dispatch(createAction('[product] get products', {})),
    getProduct: (productId) =>
      dispatch(createAction('[product] get product', {productId})),
    setProducts: (products) =>
      dispatch(createAction('[product] set products', {products})),
    setProduct: (productId, productDetail) =>
      dispatch(createAction('[product] set product', {productId, productDetail})),
  }
}