import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 5,
                    left: 10,
                    right: 10,
                    borderRadius: 5,
                    height: 65,
                    backgroundColor: '#00254f', 
                    borderColor:'#001f48'
                },
                tabBarInactiveTintColor: '#F6F5D7', 
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    ),
                    tabBarItemStyle: {
                        padding: 10,
                    },
                }}
            />
            <Tab.Screen
                name="Contact"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'setting',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                    tabBarItemStyle: {
                        padding: 10,
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomBar;
