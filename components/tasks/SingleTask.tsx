import TaskModel from "../../model/TaskModel";
import {Text, View} from "../Themed";
import {Pressable, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

export interface SingleTaskProps {
    task: TaskModel;
}

export default function SingleTask({task}: SingleTaskProps) {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('SingleTaskModal', {task})}
                       style={{width: '100%', height: '100%'}}>
                <Text style={styles.text}>{task.name}</Text>
                <Text style={styles.text}>{task.completed ? 'Done' : 'Not'}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffe3e3',
        marginBottom: 20,
        borderRadius: 7,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    text: {
        fontSize: 22,
        color: '#000'
    }
})