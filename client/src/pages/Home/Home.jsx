import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllRecipes} from '../../redux/action/action';
import Aside from './Components/Aside/Aside';
import SearchBar from './Components/SearchBar/SearchBar';
import NavBar from '../../components/layout/Nav/Nav'
import {Link} from 'react-router-dom';

export default function Home (){
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes)
  useEffect(()=>{
    dispatch(getAllRecipes());
  }, [dispatch])

  return(
    <div>
      <NavBar></NavBar>
      <h1> Soy home </h1>
      <SearchBar />
      <Aside></Aside>
      {recipes.length ? recipes.map(recipe => <li key={recipe.id}><Link to={`/detail/${recipe.id}`} >{recipe.title}</Link> : health: {recipe.healthScore}</li>) : <p>LOADING ...</p>}
    </div>
    
  );
}