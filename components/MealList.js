import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import MealItem from "./MealItem";

const MealList = ({ displayedMeals, navigation }) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        onSelectMeal={() => {
          navigation.navigate("MealDetails", {
            mealId: itemData.item.id,
          });
        }}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imageUrl={itemData.item.imageUrl}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
export default MealList;
