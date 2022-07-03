import {Text, View} from "../components/Themed";
import {Button, StyleSheet} from "react-native";
import {useFetchTasks} from "../components/tasks/hooks/useFetchTasks";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback} from "react";
import queryClient from "../api/queryClient";
import SingleTask from "../components/tasks/SingleTask";


export default function TasksScreen() {
    const {tasks} = useFetchTasks();
    const navigation = useNavigation();

    const refetchTasks = useCallback(() => {
        queryClient.invalidateQueries(["tasks"]);

    }, [])

    useFocusEffect(refetchTasks);
    console.log(tasks)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{tasks.length === 0 ? 'No tasks' : 'My tasks'}</Text>
            {tasks?.length === 0 && (
                <View>
                    <Button title={'Create new task'} onPress={() => {
                        navigation.navigate('NewTask');
                    }}/>
                </View>)
            }
            {tasks?.map(task => <SingleTask task={task} key={task.ID} />)}
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '20%'
    },
    header: {
        fontSize: 30,
        marginBottom: 30
    }
});