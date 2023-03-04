import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavorite} from '../slices/meals';

const ListItem = ({children}) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({route, navigation}) => {
  const {mealId} = route.params;

  const isFavoriteMeal = useSelector(state => {
    return state.meals.favoriteMeals.some(meal => meal.id === mealId);
  });
  const availableMeals = useSelector(state => {
    return state.meals.meals;
  });

  const selectedMeal = availableMeals.find(meal => {
    return meal.id === mealId;
  });

  const dispatch = useDispatch();

  const toggleFavHandler = () => {
    dispatch(toggleFavorite(mealId));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedMeal.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favourite"
            iconName={isFavoriteMeal ? 'star' : 'star-outline'}
            onPress={toggleFavHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [isFavoriteMeal]);

  const {duration, affordability, complexity, imageUrl, ingredients, steps} =
    selectedMeal;

  return (
    <ScrollView>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{duration}mins</DefaultText>
        <DefaultText>{complexity.toUpperCase()}</DefaultText>
        <DefaultText>{affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map(ingredient => {
        return <ListItem key={ingredient}>{ingredient}</ListItem>;
      })}
      <Text style={styles.title}>Steps</Text>
      {steps.map(step => {
        return <ListItem key={step}>{step}</ListItem>;
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
