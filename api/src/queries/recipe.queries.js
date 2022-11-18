const { Diet, Step, Op } = require('../db');

const queryRecipesWithDiet = () => {
  return {
    include: [
      {
        model: Diet,
        through: {
          attributes: []
        }
      },
      {
        model: Step,
      }
    ]
  }

};
/**
 * generador de objeto para realizar la busqueda de recipes
 * segun la propiedad y el valor solicitado.
 * @param {String} prop nombre de la propiedad a buscar 
 * @param {Any} value valor de la propiedad a buscar
 * @returns {Object} query
 */
const queryFindRecipeByProp = (prop, value) => {
  return {
    where: {
      [prop]: value
    },
    include: [
      {
        model: Diet,
        trough: {
          attributes: []
        }
      },
      {
        model: Step,
        trough: {
          attributes: []
        }
      }
    ]
    ,

  }
}

const queryFindRecipeByPropLike = (prop, value) => {
  return {
    where: {
      [prop]: { [Op.like]: `%${value}%` }
    },
    include: {
      model: Diet,
      trough: {
        attributes: []
      }
    }
  }
}

const queryFindRecipeByDiet = (diet) => {
  return {
    include:
    {
      model: Diet,
      trough: {
        attributes: []
      },
      where: {
        name: diet
      }
    },
  }
}


module.exports = {
  queryFindRecipeByProp,
  queryRecipesWithDiet,
  queryFindRecipeByPropLike,
  queryFindRecipeByDiet
}