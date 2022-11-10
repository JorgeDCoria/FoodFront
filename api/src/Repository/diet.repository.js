const {Diet}  = require('../db');

const getAllDiets = async () =>{
  try{
    const diets = await Diet.findAll();
    //if(!diets) throw {status: 400, message: `Can't find diets` };
    return diets;
  }catch(e){
    throw{status: 500, message: error.message }
  }
}

const addDiets = async (diets)=>{
  try{
    await Diet.bulkCreate(diets);
  }catch(e){
    throw{status:500, message:`Error adding diets`};
  }
}
module.exports = {
  getAllDiets, 
  addDiets
}