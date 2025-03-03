"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let fetchUser = async () => {
            try{
                const result = await axios.get("https://ecogadget.onrender.com/user", {
                    withCredentials: true,
                });

    
                setUser(result?.data?.user);
            } catch(e) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);


    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export function useUser() {
    return useContext(AuthContext);
}