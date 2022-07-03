import {AuthenticatedTabScreenProps} from '../types';
import NewTaskForm from "../components/tasks/NewTaskForm";
import {StyleSheet} from "react-native";

export default function NewTaskScreen({navigation}: AuthenticatedTabScreenProps<'NewTask'>) {

    return (
        <NewTaskForm/>
    );
}
