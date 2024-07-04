/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import React from 'react'; 
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'; 
import { Image } from 'react-native';
import AllChat from '../screens/chat_stack/AllChat';
import People from '../screens/chat_stack/People';
import UserProfile from '../screens/chat_stack/Profile';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
    initialRouteName='People'
      screenOptions={({ route }) => ({
        
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 60,
          borderRadius: 0,
          presentation: 'transparentModal',
          animationTypeForReplace: 'pop',
          animation:'slide_from_right',
        },

        tabBarIcon: ({ focused, color, size }) => {
          let colors;

          if (route.name === 'People') {
            colors = focused ? '#6515AC' : '#9d9999'

            return <Image source={require('./../assets/images/Users.png')} style={{ width: 25, height: 25, tintColor: colors }} />
          } else if (route.name === 'AllChat') {
            colors = focused ? '#6515AC' : '#9d9999'

            return <Image source={require('./../assets/images/chat.png')} style={{ width: 25, height: 25, tintColor: colors }} />


          }
          else if (route.name === 'Profile') {
            // colors = focused ? '#65B5FE' : '#9d9999'
            colors = focused ? '#6515AC' : '#9d9999'
            return (
              <FontAwesome
              
                  name={'user-o'}
                  size={25}
                  color={colors}
              />
            )
            
            // <Image source={require('./../assets/images/profile.png')} style={{ width: 25, height: 25, tintColor: colors }} />


          }

        },
      })}>
      <Tab.Screen name="People" component={People} />
      <Tab.Screen name="AllChat" component={AllChat} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
