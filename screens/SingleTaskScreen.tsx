import {AuthenticatedStackScreenProps} from '../types';
import {Text, View} from "../components/Themed";
import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, Button, StyleSheet, TextInput} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useChangeTask} from "../components/tasks/hooks/useChangeTask";
import {AuthContext} from "../store/authContext";
import {useFetchSingleTask} from "../components/tasks/hooks/useFetchSingleTask";
import {useDeleteTask} from "../components/tasks/hooks/useDeleteTask";
import {useHeaderHeight} from '@react-navigation/elements';
import layout from "../constants/Layout";


export default function SingleTaskScreen({route}: AuthenticatedStackScreenProps<"SingleTaskModal">) {
    const authCtx = useContext(AuthContext);
    let taskId = route.params.taskId;
    const {task, isLoading} = useFetchSingleTask(taskId);
    const {deleteTaskFunc} = useDeleteTask();

    const [modifyTask, setModifyTask] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskCompleted, setTaskCompleted] = useState(false);

    const {changeTaskFunc} = useChangeTask();
    useEffect(() => {
        setTaskName(task?.name!);
        setTaskCompleted(task?.completed!)
    }, [task])

    const onSubmitHandler = async () => {
        await changeTaskFunc({name: taskName, taskId: task!.ID, jwtToken: authCtx.jwtToken!, completed: taskCompleted});
        setModifyTask(false)
    }

    const onDeleteHandler = async () => {
        await deleteTaskFunc({taskId: task!.ID, jwtToken: authCtx.jwtToken!});
    }
    const headerHeight = useHeaderHeight();
    
    return (
        <View style={[styles.container, {height: layout.window.height * 0.2 - headerHeight}]}>
            {isLoading && <ActivityIndicator size={'large'}/>}
            {!isLoading && <>
                <Text style={styles.header}>{modifyTask ? 'Edit your Task' : 'View your task'}</Text>
                {!modifyTask && <View style={styles.smallSection}>
                    <Text style={styles.title}>Task name: {task?.name}</Text>
                    <Text style={styles.title}>Completed: {task?.completed ? 'Yes' : 'No'}</Text>
                </View>}
                {modifyTask && <View style={styles.smallSection}>
                    <TextInput style={styles.input} value={taskName} onChangeText={setTaskName}/>
                    <BouncyCheckbox
                        style={{width: '50%', marginVertical: 10}}
                        isChecked={taskCompleted}
                        text="Completed"
                        onPress={() => setTaskCompleted(!taskCompleted)}/>
                    <View style={styles.submit}>
                        <Button title={'Submit'} onPress={onSubmitHandler}/>
                        <Button title={'Delete task'} onPress={onDeleteHandler} color='#d11a2a'/>
                    </View>
                </View>}
                <Button title={modifyTask ? 'Exit editing' : 'Edit task'} onPress={() => {
                    setTaskName(task.name);
                    setTaskCompleted(task.completed)
                    setModifyTask(!modifyTask)
                }}/>
            </>}

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    smallSection: {
        marginBottom: 30,
        width: '80%',
        minHeight: 150
    },
    header: {
        fontSize: 30,
        marginBottom: 30
    },
    title: {
        fontSize: 20,
        marginBottom: 30
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 7,
        marginBottom: 20,
        paddingLeft: 5,
        fontSize: 20
    },
    submit: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    header: {
        fontSize: 30,
        marginBottom: 30
    },
});