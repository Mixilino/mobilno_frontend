import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Root from './navigation';
import AuthContextProvider from "./store/authContext";
import {QueryClientProvider} from "react-query";
import queryClient from "./api/queryClient";


export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthContextProvider>
                        <Root/>
                        <StatusBar/>
                    </AuthContextProvider>
                </QueryClientProvider>
            </SafeAreaProvider>
        );
    }
}
