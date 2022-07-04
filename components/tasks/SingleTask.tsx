import TaskModel from "../../model/TaskModel";
import {Text, View} from "../Themed";
import {Pressable, StyleSheet, ToastAndroid} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome5} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import {useChangeTask} from "./hooks/useChangeTask";
import {AuthContext} from "../../store/authContext";

export interface SingleTaskProps {
    task: TaskModel;
}

export default function SingleTask({task}: SingleTaskProps) {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const onOpenTaskModalHandler = () => {
        navigation.navigate('SingleTaskModal', {taskId: task.ID})
    }
    const {changeTaskFunc, isLoadingChangeTask} = useChangeTask();

    const onChangeCompletedStatusHandler = () => {
        if (isLoadingChangeTask)
            ToastAndroid.show("Wait", ToastAndroid.SHORT)
        changeTaskFunc({taskId: task.ID, completed: !task.completed, jwtToken: authCtx.jwtToken!, name: ''})
    }

    return (
        <View style={styles.card}>
            <Pressable onPress={onOpenTaskModalHandler}
                       style={{
                           alignItems: 'center',
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           width: '100%'
                       }}>
                <Text style={[styles.text, task.completed ? styles.task_completed : null]}>{task.name}</Text>
                <Pressable onPress={onChangeCompletedStatusHandler}>
                    <FontAwesome5 size={30} style={{marginBottom: -3}}
                                  name={task.completed ? 'check-square' : 'square'}/>
                </Pressable>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffe3e3',
        marginBottom: 20,
        borderRadius: 7,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        height: 50,
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
    task_completed: {
        textDecorationLine: 'line-through'
    }
})