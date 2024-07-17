import React from 'react';

// import { createAppContainer } from 'react-navigation';
import { TabRouter,createNavigatorFactory ,createNavigationContainerRef} from '@react-navigation/native';


import  createSidebarNavigator  from './tabs/SidebarTabsNavigator';
import { Home } from '../screens/Home';
import { Photos } from '../screens/Photos';



const sidebarNavigator = createSidebarNavigator(
  {
    Home: {
      screen: Home,
      params: {
        // icon: 'home',
        tabName: 'Home',
      },
    },
    Red : {
      screen: Photos,
        params: {
            // icon: 'inbox',
            tabName: 'Photos',
        }
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createNavigationContainerRef(sidebarNavigator);