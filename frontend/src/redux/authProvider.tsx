'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import toast from "react-hot-toast";

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: {children:ReactNode}){
    const [user, setUser] = useState<any>(null);

    const getUser = async() => {
        await asyncHandlerFront(
          async() => {
            const response:any = await apiClient.isUser();
            setUser(response?.me)
          },
          (error) => toast.error(error.message)
        )
    }

    useEffect(() => {
      getUser();
    }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);