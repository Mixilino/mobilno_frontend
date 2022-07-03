import {AuthTabScreenProps} from '../types';
import AuthForm from "../components/auth/AuthForm";

export default function SignInScreen({navigation}: AuthTabScreenProps<'SignIn'>) {

    return (
        <AuthForm signIn/>
    );
}
