const { Recipe, Diet, Step } = require('../db');
const {
  queryRecipesWithDiet,
  queryFindRecipeByProp,
  queryFindRecipeByPropLike
} = require('../queries/recipe.queries');
const axios = require('axios');
const { INTEGER } = require('sequelize');
const URL = 'http://localhost:3002/api/'
const recipeCtrl = {};

const mapArrayApiToArrayRecipe = (arrayApi) => {
  return arrayApi.map(recipe => mapApiToRecipe(recipe))
};

const mapApiToRecipe = (recipe) => {
  // dietas

  let dietsApi = new Set();
  recipe.vegetarian && dietsApi.add("vegetarian");
  recipe.vegan && dietsApi.add("vegan");
  recipe.glutenFree && dietsApi.add("gluten free");
  //se hace recorrido en diets para agregar solo aquellos que no pertenecen a dietsApi
  if (recipe.diets.length) {
    for (let diet of recipe.diets) {
      dietsApi.add(diet);
    }
  }
  //paso a paso
  let stepsApi = [];

  if (recipe.analyzedInstructions.length) {
    for (let obj of recipe.analyzedInstructions) {
      stepsApi = [...stepsApi, ...obj.steps.map(s => { return { number: s.number, step: s.step } })]
    };
  }

  return {
    id: recipe.id,
    title: recipe.title,
    summary: recipe.summary,
    diets: Array.from(dietsApi),
    steps: stepsApi

  }
}

recipeCtrl.getRecipes = async (req, res) => {
  try {
    if (req.query.title) {
      let recipeBd = await Recipe.findAll(queryFindRecipeByPropLike('title', req.query.title));
      let recipesApi = await axios.get(`${URL}allRecipes`).then(r => r.data.results);
      recipesApi = mapArrayApiToArrayRecipe(recipesApi.filter(r => r.title.includes(req.query.title)));
      const allRecipes = [...recipeBd, ...recipesApi];
      if(allRecipes.length) return res.json({status:'Ok', data: allRecipes});
      return res
        .status(400)
        .json({status: 'FAILED', data: `Not found recipe with name ${req.query.title}`});
      

    } else {
      const recipesBd = await Recipe.findAll(queryRecipesWithDiet());
      const recipesApi = await axios.get(`${URL}allRecipes`).then(r => mapArrayApiToArrayRecipe(r.data.results));
      res.json([...recipesApi, ...recipesBd]);
    }

  } catch (e) {
    res.status(401).json({status:'FAILED', data: `error loading recipes: ${e.message}` })
  }
}
recipeCtrl.getRecipeById = (req, res) => {

  if (isNaN(req.params.id)) {

    Recipe.findAll(queryFindRecipeByProp('id', req.params.id))
      .then(r => {
        if (r.length) return res.json(r);
        return res.json(`Not found recipe with id ${req.params.id}`)
      }).catch(e => res.status(401).json({ error: `Error searching recipe in the Database: ${e.message}` }));
  } else {
    axios.get(`${URL}byId`).then(r => {
      r ?
        res.json(mapApiToRecipe(r.data)) :
        res.json(`Not found recipe with id ${req.params.id}`)
      //r ? res.json(mapApiToRecipe(r)): res.json(`Not found recipe with id: ${req.params.id}`)
    }).catch(e => res.status(401).json({ error: `Error searching recipe in the api: ${e.message}` }))
  }



}

recipeCtrl.addRecipe = async (req, res) => {
  const { recipes } = req.body;
  try {
    let mapAux = recipes.map(r => Recipe.create({ title: r.title, summary: r.summary, healthScore: r.healthScore }));
    const result = await Promise.all(mapAux);

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].steps.length) {
        //array de promesas para crear cada step
        let stepsAux = recipes[i].steps.map(r => Step.create(r));
        //se corren las promesa
        stepsAux = await Promise.all(stepsAux);
        //array de promesas para agregar un recipe a un step
        stepsAux = stepsAux.map(r => r.setRecipe(result[i].id));
        await Promise.all(stepsAux);
      }
    }
    //const stepResult = await Promise.all(stepsAux);

    mapAux = [];
    //se arma array de promesas para agregar las dietas a las recetas
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].diets.length) mapAux.push(result[i].addDiets(recipes[i].diets))
    }
    await Promise.all(mapAux);
    const recipesBd = await Recipe.findAll(queryRecipesWithDiet);
    res.json(recipesBd);
  } catch (e) {
    res.status(401).json({ error: `error saving recipe: ${e.message}` })
  }
}

recipeCtrl.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    recipe && await recipe.update({
      title: req.body.title,
      healthScore: req.body.healthScore,
      summary: req.body.summary
    })

    await recipe.setDiets(req.body.diets)
    await recipe.save();
    res.json(recipe);

  } catch (e) {
    res.status(401).json({ error: `error updating recipe: ${e.message}` });
  }
}
recipeCtrl.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  await recipe.destroy();
  res.json("Recipes dropped");

}

module.exports = recipeCtrl;