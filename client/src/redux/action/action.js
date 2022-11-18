import axios from 'axios';
const URL = "http://localhost:3001/";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const FILTER_RECIPES_BY_DIET = "FILTER_RECIPES_BY_DIET";
export const FILTER_RECIPES_BY_TITLE = "FILTER_RECIPES_BY_TITLE";
export const ORDER_RECIPE = "ORDER_RECIPE";
export const SAVE_RECIPES = "SAVE_RECIPES";
export const ERROR = "ERROR";

export const getAllRecipes= () =>{
  return async (dispatch) =>{
    const recipes = await axios.get(`${URL}recipes`).then(r =>r.data);
    dispatch({
      type: GET_ALL_RECIPES,
      payload: recipes
    })
  }
}

export const filterRecipeByDiet = (diet) =>{
  return async (dispatch) => {
    const recipes = await axios.get(`${URL}recipes/findByDiets?name=${diet}`).then(r => r.data);
    console.log(recipes);
    dispatch({
      type: FILTER_RECIPES_BY_DIET,
      payload: recipes
    })
  }
}

export const filterRecipeByTitle = (title) =>{
  return (dispatch) =>{
    axios.get(`${URL}recipes?title=${title}`).then(res =>{
      dispatch({
        type: FILTER_RECIPES_BY_TITLE,
        payload: res.data.data
      })
    })
    .catch((e)=>{
      dispatch({
        type: ERROR,
        payload: e.message
      })
    })
  }
}

export const orderRecipe = (prop, order) =>{
  return{
    type: ORDER_RECIPE,
    payload: {prop, order}
  }
}

export const findRecipeById = (idRecipe) =>{
  return async (dispatch) =>{
    const recipes = await fetch(`${URL}recipes/findById/${idRecipe}`).then(res => res.json()).then(e => e.data);
    console.log(recipes);
  }
}

export const saveRecipes = (recipes) =>{
  return async(dispatch) =>{
    try{
      const recipesBd = await axios.post(`${URL}recipes/create`, recipes);
      dispatch({
        type: SAVE_RECIPES,
        payload: recipesBd
      })
    }catch (e){
      console.log(e)
    }
    
    
    
  }
}

