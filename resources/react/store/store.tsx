import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import auth from "../reducer/auth-reducer"

const isDev = process.env.MODE === "development" ? composeWithDevTools() : {}

export default createStore(combineReducers({ auth }), isDev)
