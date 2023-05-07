import { combineReducers } from "@reduxjs/toolkit"
import { usersReducer } from "./userReducer"

export const createReducer = () =>
    combineReducers({
        users: usersReducer
    })