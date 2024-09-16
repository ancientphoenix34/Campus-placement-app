import { LOGIN, LOGOUT, SAVEDATA } from "../constrant"

export const login = () => {
    return {
        type: LOGIN
    }
}

export const receiveUserDetails = (data)=>{
    return {
        type: SAVEDATA,
        payload: data
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}