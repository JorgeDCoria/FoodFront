const recipeRepository = require ('../Repository/recipe.repository');
const dietRepository = require('../Repository/diet.repository');

const findRecipeByDiet = async (diet) =>{
  const dietId = await dietRepository.findDietByName(diet);
  const recipesId = await recipeRepository.findRecipesIdByDiet(dietId.id);
  let recipes = await recipeRepository.findRecipesByIds(recipesId);
  return recipes;
}

module.exports = {
  findRecipeByDiet
}