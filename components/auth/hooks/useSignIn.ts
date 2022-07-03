import {useMutation} from "react-query";
import axiosInstanceTs from "../../../api/axiosInstance";
import {AxiosError} from "axios";
import {useContext} from "react";
import {AuthContext} from "../../../store/authContext";
import {RestError} from "../../../types";

const signInRequest = async (vars: signInVariables): Promise<string> => {
    const response = await axiosInstanceTs.post('/signin', {
        username: vars.username,
        password: vars.password
    });
    const data = <string>response.data;
    return data;
}

interface signInVariables {
    username: string;
    password: string
}

export const useSignIn = () => {
    const authCtx = useContext(AuthContext);
    const {
        mutateAsync: signInFunc,
        isLoading: isLoadingSignIn
    } = useMutation((vars: signInVariables) => signInRequest(vars), {
        onSuccess: (data: string) => {
            authCtx.signIn(data)
        },
        onError: (error: AxiosError) => {
            const err = <RestError>error.response?.data;
            alert(err.message)
        }
    })
    return {signInFunc, isLoadingSignIn}
}

