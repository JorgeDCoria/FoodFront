import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/action/action';
import Aside from './Components/Aside/Aside';
import SearchBar from './Components/SearchBar/SearchBar';
import NavBar from '../../components/layout/Nav/Nav';
import Loading from '../Loading/Loading';
import s from './home.module.css';
import Card from './Components/Card/Card';
import Pagination from './Components/Pagination/Pagination';
import Error from '../../components/Error/Error';
export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const error = useSelector(state => state.error);
  const [pagina, setPagina] = useState(1);
  const recipeByPage = 9;
  const totalPaginas = Math.ceil(recipes.length / recipeByPage);
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch])

  const changePage = (n) => {
    window.scrollTo(0, 0);
    setPagina(n);
  }

  const nextPage = () => {
    window.scrollTo(0, 0);
    if (pagina !== totalPaginas) setPagina(pagina + 1);
  }
  const prevPage = () => {
    window.scrollTo(0, 0);
    if (pagina !== 1) setPagina(pagina - 1);
  }
  if(recipes){
       return (
      <div>
        <NavBar></NavBar>

        <SearchBar setPagina={setPagina} />

        <div className={s.subcontainer}>
          <div className={s.containeraside}>
            <Aside setPagina={setPagina} ></Aside>
          </div>
          {/* ************************************************************
              ********************* contenedor de cards ******************
              ************************************************************ */}

          <div className={s.containersection} >
            {error  === '' && recipes.length===0 ? <Loading />:

              (error !=='' ? <div className={s.error}><Error message={error} /> </div> :
              <div>
                < Pagination pagina={pagina} changePage={changePage} totalPaginas={totalPaginas} prev={prevPage} next={nextPage} />
                <div className={s.containercards}>
                  {recipes.slice((pagina - 1) * recipeByPage, (pagina - 1) * recipeByPage + recipeByPage)
                    .map(recipe => <Card key={recipe.id} data={recipe} />)}
                </div>
                <Pagination pagina={pagina} changePage={changePage} totalPaginas={totalPaginas} prev={prevPage} next={nextPage} />
              </div>)
              
            }
          </div>

        </div>
      </div>
    );
  }else{
    return <Loading />
  }
 

}