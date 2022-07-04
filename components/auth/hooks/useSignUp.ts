import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useNavigation} from "@react-navigation/native";
import {ToastAndroid} from "react-native";
import {RestError} from "../../../types";
import axiosInstanceTs from "../../../api/axiosInstance";

const signUpRequest = async (vars: signInVariables) => axiosInstanceTs.post('/signup', {
    username: vars.username,
    password: vars.password
})

interface signInVariables {
    username: string;
    password: string
}

export const useSignUp = () => {
    const navigation = useNavigation();
    const {
        mutateAsync: signUpFunc,
        isLoading: isLoadingSignUp
    } = useMutation((vars: signInVariables) => signUpRequest(vars), {
        onSuccess: () => {
            navigation.navigate('SignIn');
            ToastAndroid.show('Successfully created account', ToastAndroid.SHORT)
        },
        onError: (error: AxiosError) => {
            const err = <RestError>error.response?.data;
            alert(err.message)
        }
    })
    return {signUpFunc, isLoadingSignUp}
}

