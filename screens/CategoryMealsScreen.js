import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const availableMeals = useSelector((state) => {
    return state.meals.filteredMeals;
  });

  const displayedMeals = availableMeals.filter((meal) => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  navigation.setOptions({
    headerTitle: selectedCategory.title,
  });
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters</DefaultText>
      </View>
    );
  }
  return <MealList displayedMeals={displayedMeals} navigation={navigation} />;
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
