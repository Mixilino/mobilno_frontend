import {FontAwesome} from '@expo/vector-icons';
import * as Font from 'expo-font';
import {useEffect, useState} from 'react';

export default function useLoadToken() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
                });
            } finally {
                setLoadingComplete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
