import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {AuthenticatedStackParamList, AuthenticatedTabParamList, AuthenticatedTabScreenProps,} from "../types";
import TasksScreen from "../screens/TasksScreen";
import AccountScreen from "../screens/AccountScreen";
import NewTaskScreen from "../screens/NewTaskScreen";
import SingleTaskScreen from "../screens/SingleTaskScreen";

const StackAuthenticated = createNativeStackNavigator<AuthenticatedStackParamList>();

export default function AuthenticatedStack() {
    return (
        <StackAuthenticated.Navigator>
            <StackAuthenticated.Screen name="Authenticated" component={BottomTabNavigatorAuthenticated}
                                       options={{headerShown: false}}/>
            <StackAuthenticated.Group screenOptions={{presentation: 'modal'}}>
                <StackAuthenticated.Screen name="SingleTaskModal" component={SingleTaskScreen}
                                           options={{title: '', headerStyle: {backgroundColor: '#000'}}}
                />
            </StackAuthenticated.Group>
        </StackAuthenticated.Navigator>
    );
}
const BottomTab = createBottomTabNavigator<AuthenticatedTabParamList>();

function BottomTabNavigatorAuthenticated() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Tasks"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerShown: false,
            }}>
            <BottomTab.Group>
                <BottomTab.Screen
                    name="Tasks"
                    component={TasksScreen}
                    options={({navigation}: AuthenticatedTabScreenProps<'Tasks'>) => ({
                        title: 'Tasks',
                        tabBarIcon: ({color}) => <FontAwesome5 size={30} style={{marginBottom: -3}} name="tasks"
                                                               color={color}/>,
                    })}
                />
                <BottomTab.Screen
                    name="NewTask"
                    component={NewTaskScreen}
                    options={{
                        title: 'New Task',
                        tabBarIcon: ({color}) => <MaterialIcons size={30} style={{marginBottom: -3}} name="add-task"
                                                                color={color}/>,
                    }}
                />
                <BottomTab.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        title: 'Account',
                        tabBarIcon: ({color}) => <MaterialIcons size={30} style={{marginBottom: -3}}
                                                                name="account-circle" color={color}/>,
                    }}
                />
            </BottomTab.Group>
        </BottomTab.Navigator>
    );
}
