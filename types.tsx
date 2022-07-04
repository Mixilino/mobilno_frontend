/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TaskModel from "./model/TaskModel";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStackParamList,
            AuthenticatedStackParamList {
        }
    }
}

export type AuthStackParamList = {
    Auth: NavigatorScreenParams<AuthTabParamList> | undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList,
        Screen>;

export type AuthTabParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type AuthTabScreenProps<Screen extends keyof AuthTabParamList> =
    CompositeScreenProps<BottomTabScreenProps<AuthTabParamList, Screen>,
        NativeStackScreenProps<AuthStackParamList>>;


export type AuthenticatedStackParamList = {
    Authenticated: NavigatorScreenParams<AuthenticatedTabParamList> | undefined;
    SingleTaskModal: { taskId: number };
};
export type AuthenticatedStackScreenProps<Screen extends keyof AuthenticatedStackParamList> = NativeStackScreenProps<AuthenticatedStackParamList,
    Screen>;
export type SingleTaskModalProps = NativeStackScreenProps<AuthenticatedStackParamList, "SingleTaskModal">;


export type AuthenticatedTabParamList = {
    Tasks: undefined;
    NewTask: undefined;
    Account: undefined;
};
export type AuthenticatedTabScreenProps<Screen extends keyof AuthenticatedTabParamList> =
    CompositeScreenProps<BottomTabScreenProps<AuthenticatedTabParamList, Screen>,
        NativeStackScreenProps<AuthenticatedStackParamList>>;


export type RestError = {
    status_code: number;
    message: string;
}

export type jwtPayload ={
    authorized: boolean;
    exp: number;
    user_id: number;
    username: string;
}