'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ME_QUERY } from "@/graphql/auth";
import { useQuery } from "@apollo/client/react";

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: {children:ReactNode}){
    const [user, setUser] = useState<any>(null);
    const { data, loading } = useQuery<any>(ME_QUERY, {
      fetchPolicy: "cache-first"
    });
    useEffect(() => {
      if (loading) return;
      if (!data?.me) return;

      setUser(data.me);
    }, [data, loading]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);