import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'
import { ROLES } from '../constants/constants'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isMod = false
    let isAdmin = false;

    if (token) {
        const decoded = jwtDecode(token)
        const { username, role } = decoded.UserInfo
        
        isMod = role === ROLES.Moderator || role === ROLES.Admin
        isAdmin = role === ROLES.Admin

        return { username, role, isMod, isAdmin }
    }
    return { username: '', role: '', isMod, isAdmin  }
}

export default useAuth