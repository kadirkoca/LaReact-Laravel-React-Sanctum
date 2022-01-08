import React from "react"
import { render } from "react-dom"
import "./styles/style.scss"
import "normalize.css/normalize.css"
import "bootstrap/dist/css/bootstrap.css"
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import { ToastContainer } from "./elements/Toast"
import store from "./store/store"

const App = () => {
    return (
        <Provider store={store}>
            <AppRouter />
            <ToastContainer />
        </Provider>
    )
}

render(<App/>, document.getElementById("app"))
