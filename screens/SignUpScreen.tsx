import {StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import React from "react";
import AuthForm from "../components/auth/AuthForm";

// @ts-ignore
export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <AuthForm/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: '20%',
    },
});
