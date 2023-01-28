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
        const { id, username, role } = decoded.UserInfo
        
        isMod = role === ROLES.MODERATOR || role === ROLES.ADMIN
        isAdmin = role === ROLES.ADMIN

        return { id, username, role, isMod, isAdmin }
    }
    return { id: '', username: '', role: '', isMod, isAdmin  }
}

export default useAuth