import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/action/action';
import Aside from './Components/Aside/Aside';
import SearchBar from './Components/SearchBar/SearchBar';
import NavBar from '../../components/layout/Nav/Nav'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import s from './home.module.css';
import Card from './Components/Card/Card';
export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes)
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch])

  return (
    <div>
      <NavBar></NavBar>
      <SearchBar />
      <div className={s.subcontainer}>
        <div className={s.containeraside}>
          <Aside ></Aside>
        </div>
        <div className={s.containercards}>
          
          {recipes.length ? recipes.map(recipe => <Card key={recipe.id} data={recipe} />) : <Loading />}

  
        </div>
      </div>

    </div>

  );
}