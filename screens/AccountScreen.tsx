import {Text, View} from "../components/Themed";
import {Button} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../store/authContext";


export default function () {
    const authCtx = useContext(AuthContext);
    return (
        <View style={{alignItems:'center', marginTop:100}}>
            <Text style={{fontSize:20, marginBottom:50}}>Account</Text>

            <Button title={'Sign out'} onPress={authCtx.signOut} />
        </View>
    )
}