import { LOGIN, LOGOUT } from "./action-types"

export const LoginAction = (content: any) =>({
    type: LOGIN,
    content,
})

export const LogoutAction = (content: any) => ({
    type: LOGOUT,
    content,
})