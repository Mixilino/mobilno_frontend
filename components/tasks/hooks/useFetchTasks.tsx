import {useQuery} from "react-query";
import axiosInstanceTs from "../../../api/axiosInstance";
import TaskModel, {TaskResponse} from "../../../model/TaskModel";
import {useContext} from "react";
import {AuthContext} from "../../../store/authContext";

const fetchTasks = async (jwtToken: string): Promise<TaskModel[]> => {
    const config = {
        headers: {Authorization: `Bearer ${jwtToken}`}
    };
    const {data} = await axiosInstanceTs.get<TaskResponse>('/task/all', config);
    return data.tasks;
}

export function useFetchTasks() {
    const authCtx = useContext(AuthContext)
    const {data: tasks = [], isLoading} = useQuery(["tasks", authCtx.jwtToken], () => fetchTasks(authCtx.jwtToken!), {
        onError: error => {
            alert("Cant fetch tasks")
        }
    })
    return {tasks, isLoading}
}