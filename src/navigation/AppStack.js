import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/auth_stack/Login';
import SignUp from '../screens/auth_stack/SignUp';
import Splash from '../screens/chat_stack/Splash';
import Chat from '../screens/chat_stack/Chat';
import PeopleProfile from '../screens/chat_stack/PeopleProfile';
import TabNavigation from './TabNavigation';
import Privacy from '../screens/chat_stack/Privacy';
import Terms from '../screens/chat_stack/Terms';
import ContactUs from '../screens/chat_stack/ContactaUs';
import Package from '../screens/chat_stack/Package';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import {useSelector} from 'react-redux';
import SettingScreen from '../screens/chat_stack/Setting';
import Payouts from '../screens/chat_stack/Payouts';

const Stack = createStackNavigator();

export default function AppStack() {
  const userdata = useSelector(state => state.auth.userAccessKey);
console.log("resposne from user data ====", userdata);
  const onUserLogin = async (userID, userName, props) => {
    return ZegoUIKitPrebuiltCallService.init(
      1041886742,
      'd5a3c8d4ffa9b0e7ce99d3951321bce4a02c1a66a9e88f3ad128429abe2bf71d',
      `chaty${userdata?._id}`,
      userdata?.name,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: require('./IPhonetune.mp3'),
          outgoingCallFileName: require('./Outgoingtune.mp3'),
        },
        requireConfig: data => {
          return {
            durationConfig: {
              isVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              props.navigation.navigate('home');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              props.navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };

  onUserLogin();
  return (
    <NavigationContainer>
        <ZegoCallInvitationDialog />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabNavigation} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="PeopleProfile" component={PeopleProfile} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Package" component={Package} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="setting" component={SettingScreen} />
        <Stack.Screen name="payout" component={Payouts} />


        <Stack.Screen
          options={{headerShown: false}}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />
      </Stack.Navigator>
      <ZegoUIKitPrebuiltCallFloatingMinimizedView />
    </NavigationContainer>
  );
}
