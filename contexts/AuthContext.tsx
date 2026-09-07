"use client"

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function refreshTokens() {
          try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/rotate-tokens`, {}, {withCredentials: true})
            
            if (response.data.success) {
              setUser(response.data.data.user)
              setAccessToken(response.data.data.accessToken)
              setLoading(false)
            }
          } catch(error) {
            setLoading(false)
          } finally{
            setLoading(false)
          }
        }
    
        refreshTokens()
      }, [])

    return <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, loading }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext)
}