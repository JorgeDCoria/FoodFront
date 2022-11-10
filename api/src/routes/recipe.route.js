const { Router } = require('express');
const recipeCtrl = require('../controllers/recipe.controller.js');

const router = Router();

router.get("/", recipeCtrl.getRecipes);
router.get("/byId/:id", recipeCtrl.getRecipeById);
router.put("/update/:id", recipeCtrl.updateRecipe);
router.post("/create", recipeCtrl.addRecipe);
router.delete("/delete/:id", recipeCtrl.deleteRecipe);


module.exports = router;