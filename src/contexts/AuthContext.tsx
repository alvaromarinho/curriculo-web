import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { api } from "../services/API";
import { authenticate } from "../services/UserService";
import Router from "next/router"

interface AuthContext {
    isAuthenticated: boolean;
    signIn: (data: AuthForm) => Promise<void>
    signOut: () => void
}

export interface AuthForm { 
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: any) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const { akToken } = parseCookies()
        setIsAuthenticated(!!akToken)
    }, [])

    async function signIn(form: AuthForm): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await authenticate(form)
                if (data) {
                    const { name, token } = data;
                    setCookie(undefined, 'akToken', token, { maxAge: 60 * 60 * 1 * 24 })
    
                    api.defaults.headers['Authorization'] = `Bearer ${token}`
                    setIsAuthenticated(true)
    
                    resolve(name);
                }
                reject(null)
            } catch (err) {
                reject(err);
            }
        })
    }

    async function signOut() {
        destroyCookie(undefined, 'akToken')
        setIsAuthenticated(false)
        Router.push('/sign-in')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
