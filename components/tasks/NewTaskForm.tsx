import {Text, View} from "../Themed";
import {Button, StyleSheet, TextInput} from "react-native";
import {useContext, useState} from "react";
import {useNewTask} from "./hooks/useNewTask";
import {AuthContext} from "../../store/authContext";


export default function NewTaskForm() {
    const authCtx = useContext(AuthContext);
    const [newTask, setNewTask] = useState('');
    const {newTaskFunc} = useNewTask();

    const onSubmitHandler = async () => {
        await newTaskFunc({name: newTask, jwtToken: authCtx.jwtToken!})
        setNewTask('')
    }
    return <View style={styles.container}>
        <Text style={styles.text}>Create new task</Text>
        <TextInput placeholder="New task name" value={newTask} style={styles.input} onChangeText={setNewTask}/>
        <Button title={'Create'} onPress={onSubmitHandler}/>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 100
    },
    text: {
        fontSize: 40
    },
    input: {
        backgroundColor: '#fff',
        width: '50%',
        borderRadius: 7,
        marginVertical: 10,
        paddingLeft: 5
    }
})
