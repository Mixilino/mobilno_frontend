export default interface TaskModel {
    ID: number;
    name: string;
    completed: boolean;
    user_id: number;
}

export interface TaskResponse {
    tasks: TaskModel[];
}