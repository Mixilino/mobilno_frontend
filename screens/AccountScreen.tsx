import {Text, View} from "../components/Themed";
import {Button} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../store/authContext";
import jwtDecode from "jwt-decode";
import {jwtPayload} from "../types";


export default function () {
    const authCtx = useContext(AuthContext);
    const user = jwtDecode<jwtPayload>(authCtx.jwtToken!);
    return (
        <View style={{alignItems: 'center', marginTop: '20%'}}>
            <Text style={{fontSize: 30, marginBottom: 50}}>Account</Text>
            <View style={{alignItems: 'center', marginBottom: 50}}>
                <Text style={{fontSize: 20}}>Username: </Text>
                <Text style={{fontSize: 20}}>{user.username}</Text>
            </View>
            <Button title={'Sign out'} onPress={authCtx.signOut}/>
        </View>
    )
}