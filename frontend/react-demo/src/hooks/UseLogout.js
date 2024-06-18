import { useAuthContext } from "./UseAuthContext"

export const useLogout = ()=>{
    const {dispatch} = useAuthContext() 
    const logout = ()=>{
        localStorage.removeItem("token")
        dispatch({type:'LOGOUT'})
    }
    return logout
}