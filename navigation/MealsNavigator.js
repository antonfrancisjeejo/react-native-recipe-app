import React from 'react';
import {Platform, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/Colors';

const deafultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={deafultStackOptions}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meals Category',
        }}
      />
      <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailScreen} />
    </Stack.Navigator>
  );
};

const FavoritesStack = createStackNavigator();

const FavNavigator = () => {
  return (
    <FavoritesStack.Navigator screenOptions={deafultStackOptions}>
      <FavoritesStack.Screen name="Favourites" component={FavoritesScreen} />
      <FavoritesStack.Screen name="MealDetails" component={MealDetailScreen} />
    </FavoritesStack.Navigator>
  );
};

const FiltersStack = createStackNavigator();

const FiltersNavigator = () => {
  return (
    <FiltersStack.Navigator screenOptions={deafultStackOptions}>
      <FiltersStack.Screen name="FiltersS" component={FiltersScreen} />
    </FiltersStack.Navigator>
  );
};

const Tab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const MealsFavTabNavigator = () => {
  return (
    <Tab.Navigator
      shifting={true}
      barStyle={{
        backgroundColor: Colors.primaryColor,
        height: 45,
        marginBottom: 20,
      }}
      screenOptions={{
        tabBarLabelStyle: {
          margin: 0,
          padding: 0,
          height: 80,
        },
      }}>
      <Tab.Screen
        name="Meals"
        component={MyStack}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons
                name="ios-restaurant"
                size={25}
                color={focused ? color : '#ffffff'}
              />
            );
          },
          tabBarColor: Colors.primaryColor,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{fontFamily: 'open-sans-bold', color: '#ffffff'}}>
                Meals
              </Text>
            ) : (
              'Meals'
            ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavNavigator}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons
                name="ios-star"
                size={25}
                color={focused ? color : '#ffffff'}
              />
            );
          },
          tabBarColor: Colors.accentColor,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{fontFamily: 'open-sans-bold', color: '#ffffff'}}>
                Favorites
              </Text>
            ) : (
              'Favorites'
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: Colors.accentColor,
        drawerLabelStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerShown: false,
      }}>
      <Drawer.Screen
        name="MealsFavs"
        component={MealsFavTabNavigator}
        options={{
          title: 'Meals',
        }}
      />
      <Drawer.Screen name="Filters" component={FiltersNavigator} />
    </Drawer.Navigator>
  );
};

const MealsNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default MealsNavigator;
