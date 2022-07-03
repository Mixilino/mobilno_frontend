import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import {FontAwesome} from "@expo/vector-icons";
import {AuthenticatedTabParamList, AuthenticatedTabScreenProps} from "../types";
import TasksScreen from "../screens/TasksScreen";
import AccountScreen from "../screens/AccountScreen";
import NewTaskScreen from "../screens/NewTaskScreen";
import SingleTaskScreen from "../screens/SingleTaskScreen";

const StackAuthenticated = createNativeStackNavigator();

export default function AuthenticatedStack() {
    return (
        <StackAuthenticated.Navigator>
            <StackAuthenticated.Screen name="Authenticated" component={BottomTabNavigatorAuthenticated}
                                       options={{headerShown: false}}/>
            {/*<StackAuthenticated.Group screenOptions={{presentation: 'modal', headerTitleAlign: 'center',}}>*/}
            {/*    <StackAuthenticated.Screen name="Modal" component={ModalScreen}/>*/}
            {/*</StackAuthenticated.Group>*/}
            <BottomTab.Group screenOptions={{presentation: 'modal'}}>
                <BottomTab.Screen name="SingleTaskModal" component={SingleTaskScreen}/>
            </BottomTab.Group>

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
                    })}
                />
                <BottomTab.Screen
                    name="NewTask"
                    component={NewTaskScreen}
                    options={{
                        title: 'New Task',
                        tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                    }}
                />
                <BottomTab.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        title: 'Account',
                        tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                    }}
                />
            </BottomTab.Group>
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
