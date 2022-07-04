import {Text, View} from "../components/Themed";
import {Button, FlatList, ListRenderItem, StyleSheet} from "react-native";
import {useFetchTasks} from "../components/tasks/hooks/useFetchTasks";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useContext} from "react";
import queryClient from "../api/queryClient";
import SingleTask from "../components/tasks/SingleTask";
import TaskModel from "../model/TaskModel";
import {AuthContext} from "../store/authContext";


export default function TasksScreen() {
    const {tasks} = useFetchTasks();
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);

    const refetchTasks = useCallback(() => {
        queryClient.invalidateQueries(["tasks", authCtx.jwtToken]);
    }, [])

    useFocusEffect(refetchTasks);

    const renderTask: ListRenderItem<TaskModel> = ({item}) => <SingleTask task={item}/>;

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
            <FlatList contentContainerStyle={{alignItems: 'center'}}
                      data={tasks.sort((t1, t2) => t1.ID < t2.ID ? -1 : 1)} renderItem={renderTask} horizontal={false}
                      keyExtractor={item => item.ID}/>
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
    },
});