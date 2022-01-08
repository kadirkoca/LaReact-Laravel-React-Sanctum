import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { LoginAction } from "../actions/auth-actions"
import dataService from "../services/data-service"
import Home from "../frames/Home"
import Login from "../frames/Login"

const AppRouter = (props: any) => {
    if (props.csrf === null) {
        dataService.GetCSRF().then((csrf) => {
            const context = {
                authenticated: props.authenticated,
                user: props.user,
                csrf,
            }
            if (csrf) {
                props.LoginAction(context)
            }
        })
    }

    return (
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Login' element={<Login />} />
                </Routes>
            </Router>
        </React.StrictMode>
    )
}

const mapStateToProps = (state: any) => {
    const { authenticated, csrf, user } = state.auth || {}

    return {
        authenticated,
        csrf,
        user,
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    LoginAction: (context: any) => dispatch(LoginAction(context)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
