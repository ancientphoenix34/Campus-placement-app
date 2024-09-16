import { LOGIN, LOGOUT, SAVEDATA } from "../constrant"

const initialState = {
    loginStatus: false,
    userdata:{}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loginStatus: true
            }

        case LOGOUT:
            return {
                ...state,
                loginStatus: false
            }

            case SAVEDATA:
                return {
                    ...state,
                    userdata:action.payload
                }


        default:
            return initialState
    }
}

export default authReducer