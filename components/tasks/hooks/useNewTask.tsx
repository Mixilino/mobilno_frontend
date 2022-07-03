import {useMutation} from "react-query";
import axiosInstanceTs from "../../../api/axiosInstance";
import {useNavigation} from "@react-navigation/native";
import {ToastAndroid} from "react-native";


const newTaskRequest = async (vars: newTaskVariables) => {
    const config = {
        headers: {Authorization: `Bearer ${vars.jwtToken}`}
    };
    await axiosInstanceTs.post('/task', {
        name: vars.name,
    }, config)
}


interface newTaskVariables {
    name: string;
    jwtToken: string
}

export const useNewTask = () => {
    const navigation = useNavigation();
    const {
        mutateAsync: newTaskFunc,
        isLoading: isLoadingNewTask
    } = useMutation((vars: newTaskVariables) => newTaskRequest(vars), {
        onSuccess: () => {
            ToastAndroid.show('Successfully created task', ToastAndroid.LONG)
        }
    })
    return {newTaskFunc, isLoadingNewTask}
}