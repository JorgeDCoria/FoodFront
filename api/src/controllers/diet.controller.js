const {Diet} = require('../db.js');
const dietService = require('../services/diet.service')

const dietCtrl = {};

const getAllDietbd = async () =>{
  return await Diet.findAll();
}

dietCtrl.getDiet = async (req, res)=>{
  //const dietaBd = await getAllDietbd();
  const diets = await dietService.getALLDietsFromApi();
  res.json(diets);
}

dietCtrl.createDiet = async (req, res) =>{
  const {name} = req.body;
  try{
    const newDiet = await Diet.create({name});
    res.json(newDiet);
  }catch (e){
    res.status(401).json({error: "Failed to save diet. razon: "+e.message});
  }


}

module.exports = dietCtrl;