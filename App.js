import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from "./src/navigations/StackNav";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const App = () => {
  React.useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '731289701240-j9lt2i0j6q7uj0dphvibc71fbdl61ct0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
   
    });
  },[])
  
  return (
    <NavigationContainer>
      <StackNav />
      {/* <BottomBar /> */}
    </NavigationContainer>
  );
};

export default App;