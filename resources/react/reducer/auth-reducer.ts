import { LOGIN, LOGOUT } from "../actions/action-types"
import { authContext, WriteStorage } from "../services/storage-service"

export default (state = authContext(), action: any) => {
    const { type, content } = action

    switch (type) {
        case LOGIN:
            WriteStorage(content)
            return {
                ...state,
                ...content,
            }
        case LOGOUT:
            return {
                ...state,
                ...content,
            }
        default:
            return state
    }
}
