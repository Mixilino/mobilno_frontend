import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthStackParamList, AuthTabParamList, AuthTabScreenProps} from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome} from "@expo/vector-icons";

const StackAuth = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStack() {
    return (
        <StackAuth.Navigator>
            <StackAuth.Screen name="Auth" component={BottomTabNavigatorAuth} options={{headerShown: false}}/>
        </StackAuth.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<AuthTabParamList>();

function BottomTabNavigatorAuth() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="SignIn"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerShown: false,
            }}>
            <BottomTab.Screen
                name="SignIn"
                component={SignInScreen}
                options={({navigation}: AuthTabScreenProps<'SignIn'>) => ({
                    title: 'Sign in',
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,

                    // headerRight: () => (
                    //   <Pressable
                    //     onPress={() => navigation.navigate('Modal')}
                    //     style={({ pressed }) => ({
                    //       opacity: pressed ? 0.5 : 1,
                    //     })}>
                    //     <FontAwesome
                    //       name="info-circle"
                    //       size={25}
                    //       color={Colors[colorScheme].text}
                    //       style={{ marginRight: 15 }}
                    //     />
                    //   </Pressable>
                    // ),
                })}
            />
            <BottomTab.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    title: 'Sign up',
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
