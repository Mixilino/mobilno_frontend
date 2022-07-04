import * as React from "react";
import {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ToastAndroid} from "react-native";


interface AuthContextInterface {
    jwtToken: string | null;
    isAuthenticated: boolean;
    signIn: (token: string, welcome?:boolean) => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
    jwtToken: '',
    isAuthenticated: false,
    signIn: async (token: string, welcome?: boolean) => {
    },
    signOut: async () => {
    }
})

interface AuthContextProviderProps {
    children?: React.ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const signIn = async (token: string, welcome?: boolean) => {
        setAuthToken(token);
        await AsyncStorage.setItem('jwt', token);
        ToastAndroid.show(welcome ? 'Welcome back' : 'Signed In', 1000);
    }
    const signOut = async () => {
        setAuthToken(null);
        await AsyncStorage.removeItem('jwt');
        ToastAndroid.show('Signed Out', 1000);
    }
    const value = {
        jwtToken: authToken,
        isAuthenticated: !!authToken,
        signIn: signIn,
        signOut: signOut
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;