import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {ColorSchemeName} from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import {AuthContext} from "../store/authContext";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const colorScheme = useColorScheme();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function readJwtFromStorage() {
            // const storedToken = await AsyncStorage.getItem('jwt');
            // if (storedToken) {
            //     authCtx.signIn(storedToken);
            // }
            setIsTryingLogin(false)
        }

        readJwtFromStorage()
    }, [])
    if (isTryingLogin) {
        // return <View><ActivityIndicator size={"large"}/></View>
    }
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


