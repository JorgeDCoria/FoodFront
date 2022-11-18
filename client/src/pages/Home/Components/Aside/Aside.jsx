import React, { useEffect, useState } from "react";
import dietService from '../../../../services/diet/diet.service';
import {filterRecipeByDiet, orderRecipe} from '../../../../redux/action/action';
import { useDispatch } from "react-redux";
export default function Aside(){
  const [diets, setDiets] = useState([]);
  const [selectOrder, setSelectOrder] = useState('');
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
  dietService.getAllDiets().then(r => {
    setDiets(r)})
    
  },[])

  const filterByDiet = (diet) =>{
    dispatch(filterRecipeByDiet(diet));
  }

  const handleSelectOrder =(e)=>{
    setSelectOrder(e.target.value);
    setOrder(null)
  }

  const handleOrder = (e) =>{
    setOrder(e.target.value);
    console.log(selectOrder)
    dispatch(orderRecipe(selectOrder,e.target.value));
  }
  return(
   <>
    <h1>Filtros</h1>   
    <select name="dietSelect" onChange={(e)=>filterByDiet(e.target.value)}>
      <option value="">Seleccione dieta</option>
      {diets.length && diets.map(d => <option key={d.id} value={d.name}>{d.name}</option>) }
    </select>
    <select value={selectOrder} onChange={(e)=>handleSelectOrder(e)} name="orderRecipes" id="">
      <option value="">seleccione orden</option>
      <option value="title">Recipe</option>
      <option value="healtScore">Healt Score</option>
    </select>
    {selectOrder.length && 
      <div>
        <label htmlFor="">Ascendente
           <input type="radio" name="order" id="" value={"asc"} checked={order === "asc"} onChange={(e)=>handleOrder(e)} />
        </label>
        <label htmlFor="">Descendente
          <input type="radio" name="order" id="" value={"desc"} checked={order === "desc"} onChange={(e)=>handleOrder(e)} />
        </label>
       
      </div>
    }
    {!diets.length && <p>Loading</p>}
    
   </>
  )
}