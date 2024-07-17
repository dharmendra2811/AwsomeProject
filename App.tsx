/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Navigator } from './Source/Navigation';
import { CustomeBottomNavigator } from './Source/Navigation/CustomBottomNavigation';

function App(): React.JSX.Element {
  // return(<>{<CustomeBottomNavigator />}</>)
  return (
      <View style={{flex:1}}>
        <Navigator /> 
      </View>
  );
}


export default App;
