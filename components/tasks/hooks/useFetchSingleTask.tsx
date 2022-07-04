import {useQuery} from "react-query";
import axiosInstanceTs from "../../../api/axiosInstance";
import TaskModel from "../../../model/TaskModel";
import {useContext} from "react";
import {AuthContext} from "../../../store/authContext";

const fetchTask = async (jwtToken: string, taskId: number): Promise<TaskModel> => {
    const config = {
        headers: {Authorization: `Bearer ${jwtToken}`}
    };
    const {data} = await axiosInstanceTs.get<{ task: TaskModel }>(`/task/${taskId}`, config);
    return data.task;
}

export function useFetchSingleTask(taskId: number) {
    const authCtx = useContext(AuthContext)
    const {
        data: task,
        isLoading
    } = useQuery(["tasks", authCtx.jwtToken, taskId], () => fetchTask(authCtx.jwtToken!, taskId), {
        onError: error => {
            alert("Cant fetch task with id")
        }
    })
    return {task, isLoading}
}