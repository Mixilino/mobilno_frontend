/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { AuthStackParamList } from '../types';

const linking: LinkingOptions<AuthStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Unprotected: {
        screens: {
          SignIn: {
            screens: {
              SignInScreen: 'SignIn',
            },
          },
          SignUp: {
            screens: {
              SignUpScreen: 'SignUp',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
