// // BottomTabBar.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';

// const BottomTabBar = ({ state, descriptors, navigation }) => {
//   return (
//     <View style={styles.tabBarContainer}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const icon = options.tabBarIcon ? options.tabBarIcon : null;

//         return (
//           <TouchableOpacity
//             key={route.key}
//             onPress={onPress}
//             style={[
//               styles.tabBarItem,
//               { backgroundColor: isFocused ? 'blue' : 'transparent' },
//             ]}
//           >
//             {icon && (
//               <Icon
//                 name={'user'}
//                 size={24}
//                 color={isFocused ? 'white' : 'gray'}
//                 style={styles.tabBarIcon}
//               />
//             )}
//             <Text style={[styles.tabBarLabel, { color: isFocused ? 'white' : 'gray' }]}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'lightgray', // Background color of the tab bar
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 60, // Height of the tab bar
//   },
//   tabBarItem: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabBarIcon: {
//     marginBottom: 3,
//   },
//   tabBarLabel: {
//     fontSize: 12,
//   },
// });

// export default BottomTabBar;
