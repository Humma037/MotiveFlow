import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgetScreen from '../screens/ForgetScreen';
import NewPassword from '../screens/NewPassword';
import RegisterScreen from '../screens/RegisterScreen';
import CustomHeader from '../components/CustomHeader';
import ProfileScreen from '../screens/ProfileScreen';
import StorySectionScreen from '../screens/StorySectionScreen';
import AboutUs from '../screens/AboutUs';
import BottomBar from './BottomBar';
import Library from '../screens/Library';


const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Stack.Screen name="MainScreen" component={MainScreen} /> */}
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="HomeScreen" component={BottomBar} />
      <Stack.Screen name="StorySectionScreen" component={StorySectionScreen} />
      <Stack.Screen name="CustomHeader" component={CustomHeader} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Library" component={Library} />
    </Stack.Navigator>
  );
};

export default StackNav;