import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Profile } from '../Screens/Profile';
import { Home } from '../Screens/Home';

const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }:any) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {state.routes.map((route:any, index:any) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabItem, isFocused && styles.tabItemFocused]}
              key={route.key}
            >
              <Text style={styles.tabText}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.contentContainer}>
        {state.routes.map((route:any, index:any) => {
          const isFocused = state.index === index;
          const { render: ScreenComponent } = descriptors[route.key];
          return (
            <View
              key={route.key}
              style={[styles.screen, { display: isFocused ? 'flex' : 'none' }]}
            >
              {ScreenComponent()}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const CustomBottomNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props:any) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Home} />
      <Tab.Screen name="Dashboard" component={Profile} />
    </Tab.Navigator>
  );
};

export const CustomeBottomNavigator = () => {
  return (
    <NavigationContainer>
      <CustomBottomNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: height,
    width: width,
  },
  tabContainer: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    width: 100,
    height: '100%',
  },
  tabItem: {
    padding: 10,
    alignItems: 'center',
  },
  tabItemFocused: {
    backgroundColor: '#ddd',
  },
  tabText: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  screen: {
    flex: 1,
    height: '100%',
    width:'100%'
  },
});

export default CustomeBottomNavigator;
