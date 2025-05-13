import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ICredentials {
    login: string | null,
    password: string | null
}

export interface ICredentialsContext {
    isAuth: boolean,
    login: (login: string, password: string) => void,
    logout: () => void
}

const initialValue: ICredentials = {
    login: null,
    password: null
}

const AuthContext = createContext<ICredentialsContext | undefined>(undefined);

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [credentials, setCredentials] = useState<ICredentials>(() => {
        const authData = localStorage.getItem('auth')
        return authData ? JSON.parse(authData) : initialValue
    })
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const navigate = useNavigate()

    const login = (login: string | null, password: string | null) => {
        if (login && password) {
            setCredentials({
                login,
                password
            })
            localStorage.setItem('auth', JSON.stringify({
                login,
                password
            }))
            navigate('/')
        }
    }

    const logout = () => {
        setCredentials(initialValue)
        localStorage.removeItem('auth')
        navigate('/')
    }

    useEffect(() => {
        if (credentials.login && credentials.password) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [credentials])

    return (
        <AuthContext.Provider value={{
            isAuth,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}