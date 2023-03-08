import {createSlice} from '@reduxjs/toolkit';
import MEALS from '../data/dummy';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.payload,
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        state.favoriteMeals = updatedFavMeals;
      } else {
        const meal = state.meals.find(meal => meal.id === action.payload);
        state.favoriteMeals = state.favoriteMeals.concat(meal);
      }
    },
    setFilters(state, action) {
      const appliedFilters = action.payload;
      const updatedfilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      state.filteredMeals = updatedfilteredMeals;
    },
  },
});

export const {toggleFavorite, setFilters} = mealsSlice.actions;

export default mealsSlice.reducer;
