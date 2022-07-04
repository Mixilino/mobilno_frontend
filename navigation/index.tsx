import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import {ColorSchemeName} from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import {AuthContext} from "../store/authContext";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import {jwtPayload} from "../types";

export default function Root() {
    const colorScheme = useColorScheme();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function readJwtFromStorage() {
            const storedToken = await AsyncStorage.getItem('jwt');
            if (storedToken) {
                const token = jwtDecode<jwtPayload>(storedToken);
                const expires = new Date(token.exp * 1000);
                if (expires > new Date()) {
                    authCtx.signIn(storedToken, true);
                }
            }
        }

        readJwtFromStorage()
    }, []);

    return <Navigation colorScheme={colorScheme}/>
}

function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer
            // linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {authCtx.isAuthenticated && <AuthenticatedStack/>}
            {!authCtx.isAuthenticated && <AuthStack/>}
        </NavigationContainer>
    );
}


