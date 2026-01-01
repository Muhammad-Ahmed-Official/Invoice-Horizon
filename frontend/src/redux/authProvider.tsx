'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ME_QUERY } from "@/graphql/auth";
import { useQuery } from "@apollo/client/react";

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: {children:ReactNode}){
    const [user, setUser] = useState<any>(null);
    const { data } = useQuery<any>(ME_QUERY, {
      fetchPolicy: "cache-first"
    });
    const getUser = () => {
      if(!data?.me) return;
      setUser(data.me)  
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