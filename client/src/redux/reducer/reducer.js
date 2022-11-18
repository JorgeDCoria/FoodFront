import {
  GET_ALL_RECIPES,
  FILTER_RECIPES_BY_DIET,
  FILTER_RECIPES_BY_TITLE,
  ORDER_RECIPE,
  SAVE_RECIPES
} from '../action/action';
const initialState = {
  recipes: [],
  detail: null
}
const orderRecipes = (recipes, ord) =>{
  if(ord.prop ==="title"){
    ord.order === "asc"?
    recipes.sort((a, b) => orderRecipesByTitleAsc(a,b)):
    recipes.sort((a, b) => orderRecipesByTitleAsc(b,a));
  }else{
    ord.order ==="asc" ?
    recipes.sort((a,b) => a.healthScore - b.healthScore):
    recipes.sort((a,b) => b.healthScore - a.healthScore);
  }
  return recipes;
}

const orderRecipesByTitleAsc = (a, b) => {
  const nameA = a.title.toUpperCase(); // ignore upper and lowercase
  const nameB = b.title.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };

    case FILTER_RECIPES_BY_DIET:
      return {
        ...state,
        recipes: action.payload
      }
    case FILTER_RECIPES_BY_TITLE:
      return {
        ...state,
        recipes: action.payload
      }
    case ORDER_RECIPE:
      const auxRecipes = orderRecipes([...state.recipes], action.payload);
      return {
        ...state,
        recipes: auxRecipes
      }
    case SAVE_RECIPES:
      return{
        ...state,
        recipes: action.payload
      }
    default:
      return state;
  }
}
export default rootReducer;