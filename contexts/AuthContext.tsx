"use client"

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(() => {
    if (typeof window == "undefined") return null

    try {
      const userJson = localStorage.getItem("user")

      if (userJson) {
        setLoading(false)
        return JSON.parse(userJson)
      }else {
        setLoading(false)
        return null
      }
    } catch(error) {
      console.log(error)
    }
  });

    return <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext)
}