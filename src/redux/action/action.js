import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const FILTER_RECIPES_BY_DIET = "FILTER_RECIPES_BY_DIET";
export const FILTER_RECIPES_BY_TITLE = "FILTER_RECIPES_BY_TITLE";
export const ORDER_RECIPE = "ORDER_RECIPE";
export const SAVE_RECIPES = "SAVE_RECIPES";
export const ERROR = "ERROR";
export const CLEAN_ERROR = "CLEAN";

const URL = process.env.REACT_APP_URL;

export const getAllRecipes = () => {
  return async (dispatch) => {
    const recipes = await axios.get(`${URL}recipes`).then((r) => r.data);
    dispatch({
      type: GET_ALL_RECIPES,
      payload: recipes,
    });
  };
};

export const filterRecipeByDiet = (diet) => {
  return async (dispatch) => {
    const recipes = await axios
      .get(`${URL}recipes/findByDiets?name=${diet}`)
      .then((r) => r.data);
    dispatch({
      type: FILTER_RECIPES_BY_DIET,
      payload: recipes,
    });
  };
};

export const filterRecipeByTitle = (title) => {
  return (dispatch) => {
    axios
      .get(`${URL}recipes?title=${title}`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        dispatch({
          type: FILTER_RECIPES_BY_TITLE,
          payload: res.data.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: ERROR,
          payload: e.response.data.message,
        });
      });
  };
};

export const orderRecipe = (prop, order) => {
  return {
    type: ORDER_RECIPE,
    payload: { prop, order },
  };
};

export const findRecipeById = (idRecipe) => {
  return async (dispatch) => {
    const recipes = await fetch(`${URL}recipes/findById/${idRecipe}`)
      .then((res) => res.json())
      .then((e) => e.data);
    console.log(recipes);
  };
};

export const saveRecipes = (recipes) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL}recipes/create`, recipes);
      dispatch({
        type: SAVE_RECIPES,
        payload: "",
      });
    } catch (e) {
      console.log(e);
      alert("error to saving recipe");
    }
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR,
  };
};
