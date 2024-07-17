import React from 'react';

import SidebarTabs from './SidebarTabs';
import { View } from 'react-native';
import { TabRouter,createNavigatorFactory } from '@react-navigation/native';

const SidebarTabsNavigator = ({ navigation, descriptors }:any) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
        <SidebarTabs
          descriptors={descriptors}
          navigation={navigation}
        />
        <ActiveScreen navigation={descriptor.navigation} />
    </View>
  );
};

const createSidebarNavigator = (routeConfigMap:any, TabActionType:any) => {
  const customTabRouter = TabRouter(routeConfigMap, TabActionType);

  return createNavigatorFactory(SidebarTabsNavigator, customTabRouter, {});
};

export default createSidebarNavigator;