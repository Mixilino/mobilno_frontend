import {useMutation} from "react-query";
import axiosInstanceTs from "../../../api/axiosInstance";
import {useNavigation} from "@react-navigation/native";
import {ToastAndroid} from "react-native";
import queryClient from "../../../api/queryClient";
import {useContext} from "react";
import {AuthContext} from "../../../store/authContext";


const deleteTask = async (vars: deleteTaskVariables) => {
    const config = {
        headers: {Authorization: `Bearer ${vars.jwtToken}`}
    };
    await axiosInstanceTs.delete(`/task/${vars.taskId}`, config)
}


interface deleteTaskVariables {
    jwtToken: string;
    taskId: number;
}

export const useDeleteTask = () => {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const {
        mutateAsync: deleteTaskFunc
    } = useMutation((vars: deleteTaskVariables) => deleteTask(vars), {
        onSuccess: (changedOnlyCompletedStatus: boolean) => {
            ToastAndroid.show('Successfully deleted task', ToastAndroid.SHORT);
            navigation.navigate('Authenticated');
        }
    })
    return {deleteTaskFunc}
}