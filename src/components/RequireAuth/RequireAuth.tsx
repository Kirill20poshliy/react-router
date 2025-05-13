import { FC } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth: FC = () => {
    const context = useAuthContext()
    const isAuth = context?.isAuth

    return isAuth 
        ? <Outlet />
        : <Navigate to='/' />
}

export default RequireAuth
