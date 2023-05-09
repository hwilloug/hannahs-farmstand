import { combineReducers } from "@reduxjs/toolkit"
import { usersReducer } from "./userReducer"
import { productsReducer } from "./productReducer"

export const createReducer = () =>
    combineReducers({
        users: usersReducer,
        products: productsReducer
    })