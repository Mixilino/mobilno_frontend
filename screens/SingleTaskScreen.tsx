import {AuthenticatedTabScreenProps} from '../types';
import {Text, View} from "../components/Themed";
import TaskModel from "../model/TaskModel";
import {SingleTaskProps} from "../components/tasks/SingleTask";


export default function SingleTaskScreen({task}: SingleTaskProps) {

    return (
        <View>
            <Text>
                {task.name}
            </Text>
        </View>
    );
}
