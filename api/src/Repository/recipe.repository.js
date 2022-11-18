const {Recipe, conn} = require('../db');
const {QueryTypes} = require('sequelize');
const {queryFindRecipeByProp} = require('../queries/recipe.queries')
const findRecipeByDiet = async (diet)=>{
  //const recipe = await 
}

const findRecipesIdByDiet = async (dietId) =>{
 const recipesId = await conn.query(`SELECT "recipeId" FROM recipes_diets WHERE "dietId"='${dietId}'`, {type: conn.QueryTypes.SELECT});
  return recipesId;
}

const findRecipesByIds = async (arrayRecipesId)=>{
  let aux = arrayRecipesId.map(e => Recipe.findOne(queryFindRecipeByProp("id", e.recipeId) ));
  const recipes = await Promise.all(aux);
  return recipes;
}

module.exports = {
  findRecipeByDiet,
  findRecipesIdByDiet,
  findRecipesByIds
}