import React, { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//import { findRecipeById } from "../../redux/action/action";


export default function Detail () {
  const {idRecipe} = useParams();
 // const dispatch = useDispatch();
  const [recipe, setRecipe] = useState(null);
  useEffect(()=>{
    //dispatch(findRecipeById(idRecipe));
    fetch(`http://localhost:3001/recipes/findById/${idRecipe}`)
      .then(r => r.json())
      .then(rec =>{
        setRecipe(rec.data);
      });
    return setRecipe(null);
  },[ idRecipe])
  return (
    <div>
      <h1>soyt detail id {idRecipe}</h1>
      {recipe ? <p>{recipe.title}</p>:<p>Loading...</p>}
    </div>
    

  );
}