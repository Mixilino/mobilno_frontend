import {Text, View} from "../Themed";
import {Button, Image, Keyboard, StyleSheet, TextInput} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useCallback, useContext, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {useSignUp} from "./hooks/useSignUp";
import {AuthContext} from "../../store/authContext";
import {useSignIn} from "./hooks/useSignIn";

interface AuthFormProps {
    signIn?: boolean;
}

const AuthForm = ({signIn}: AuthFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {signUpFunc} = useSignUp()
    const {signInFunc} = useSignIn()
    const authCtx = useContext(AuthContext);

    const resetForm = useCallback(() => {
        setUsername('');
        setPassword('');
        setShowPassword(false)
    }, []);

    useFocusEffect(resetForm);

    const onSubmitHandler = () => {
        Keyboard.dismiss();
        if (signIn) {
            signInFunc({username: username, password: password});
        } else {
            signUpFunc({username: username, password: password});
        }
        resetForm();
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Text style={{
                    fontSize: 30,
                    textAlign: 'center'
                }}>{signIn ? 'Sign in' : 'Create an account'}</Text>
            </View>
            <View style={{alignItems: 'center', width: '100%', marginTop: 80}}>
                <Image source={require('../../assets/images/logo.png')} style={styles.image}/>
                <TextInput style={styles.input} autoCapitalize="none" placeholder="username" value={username}
                           onChangeText={setUsername}/>
                <View style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
                    <TextInput style={styles.input} autoCapitalize="none" secureTextEntry={!showPassword}
                               placeholder="password"
                               value={password} onChangeText={setPassword}/>
                    <BouncyCheckbox
                        style={{width: '50%', marginVertical: 10}}
                        isChecked={showPassword}
                        text="Show password"
                        onPress={() => setShowPassword(!showPassword)}/>
                </View>
                <Button color='#665656' title={signIn ? 'Sign In' : 'Sign Up'}
                        onPress={onSubmitHandler}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: '20%',
        width:'100%'

    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    input: {
        backgroundColor: '#fff',
        width: '50%',
        borderRadius: 7,
        marginVertical: 10,
        paddingLeft: 5
    }
});

export default AuthForm;