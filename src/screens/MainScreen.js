// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator , StyleSheet} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';

// const MainScreen = () => {
//   const navigation = useNavigation();
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged((authUser) => {
//       setUser(authUser);
//       if (initializing) {
//         setInitializing(false);
//       }
//     });

//     return unsubscribe;
//   }, [initializing]);

//   if (initializing) {
//     // Display a loading indicator while initializing
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (user) {
//     // User is authenticated, navigate to the HomeScreen
//     navigation.navigate('HomeScreen');
//     return null; 
//   } else {
//     // User is not authenticated, navigate to the LoginScreen
//     navigation.navigate('LoginScreen');
//     return null; 
//   }
// };

// export default MainScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 450,
//     },
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   customButton: {
//     margin: 25,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     marginRight: 10,
//   },
// });
