import React, {useEffect} from 'react';
import MealList from '../components/MealList';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {View, StyleSheet} from 'react-native';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Your Favorites',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const favoriteMeals = useSelector(state => {
    return state.meals.favoriteMeals;
  });

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found.Start adding some!</DefaultText>
      </View>
    );
  }
  return <MealList displayedMeals={favoriteMeals} navigation={navigation} />;
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
