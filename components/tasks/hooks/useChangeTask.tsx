import {useMutation} from "react-query";
import axiosInstanceTs from "../../../api/axiosInstance";
import {useNavigation} from "@react-navigation/native";
import {ToastAndroid} from "react-native";
import queryClient from "../../../api/queryClient";
import {useContext} from "react";
import {AuthContext} from "../../../store/authContext";


const changeTask = async (vars: changeTaskVariables): Promise<boolean> => {
    const config = {
        headers: {Authorization: `Bearer ${vars.jwtToken}`}
    };
    await axiosInstanceTs.put(`/task/${vars.taskId}`, {
        name: vars.name,
        completed: vars.completed
    }, config)
    return vars.name !== ""
}


interface changeTaskVariables {
    name?: string;
    completed?: boolean;
    jwtToken: string;
    taskId: number;
}

export const useChangeTask = () => {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const {
        mutateAsync: changeTaskFunc,
        isLoading: isLoadingChangeTask
    } = useMutation((vars: changeTaskVariables) => changeTask(vars), {
        onSuccess: (changedOnlyCompletedStatus: boolean) => {
            if (changedOnlyCompletedStatus) {
                ToastAndroid.show('Successfully changed task', ToastAndroid.SHORT);
            }
            queryClient.invalidateQueries(["tasks", authCtx.jwtToken])
        }
    })
    return {changeTaskFunc, isLoadingChangeTask}
}