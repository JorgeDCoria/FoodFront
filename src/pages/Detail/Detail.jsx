import React, { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "../../components/layout/Nav/Nav";
import Loading from "../Loading/Loading";
import s from './detail.module.css';
import image from '../../assets/imageBook.jpg';

//import { findRecipeById } from "../../redux/action/action";
var stringToHTML = function (str) {
  var dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;

};


export default function Detail() {
  const { idRecipe } = useParams();
  // const dispatch = useDispatch();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    //dispatch(findRecipeById(idRecipe));
    fetch(`http://localhost:3001/recipes/findById/${idRecipe}`)
      .then(r => r.json())
      .then(rec => {
        setRecipe(rec.data);
        if(rec.data.summary !==''){
          let div = document.querySelector('#summary')
          const summ = stringToHTML(rec.data.summary);
          div.append(summ);
        }
        
      });
    
  }, [idRecipe])
  if (recipe) {

    return (
      <div className={s.container}>
        <div className={s.containernav}>
          <Nav />
        </div>
        
        <div className={s.containerdetail} >
          <h1 className={s.title}>{recipe.title}</h1>
          <img className={s.imgstyle} src={recipe.image} alt='img detail' />
          <hr />
          {/***********************************************
            ********** DIETS  Y HEALTH SCORE **************
            *********************************************** */}
          <div className={s.containerhealtdiets}>
            <div className={s.diets}>
              <p className={s.subtitle}> TIPO DE DIETA</p>
              <ul className={s.ul}>
                {recipe.diets.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
            <div className={s.healthScore}>
              <p className={s.number}>{recipe.healthScore}</p>
              <p className={s.healthtitle}>Healt Score</p>
            </div>
          </div>
          <hr />
          {/***********************************************
            ***************** SUMMARY *********************
            *********************************************** */}
          <div className={s.containersummary}>
            <p className={s.subtitle}>summary</p>
            {recipe.summary.length !==0 ?
              <div id="summary" className={s.subcontainersummary}> </div >:
              <p className={s.aviso}>The recipe haven't summary</p>
            
            }
           
          </div>

            {/***********************************************
            ***************** STEPS *********************
            *********************************************** */}
          <div className={s.containersteps}>
            <img src={image} alt="" />
            <div className={s.subcontainersteps}>
              <p className={`${s.subtitle} ${s.titlesteps}`}>STEPS</p>
              {recipe.steps.length !==0 ? 
                <ol>
                  {recipe.steps.map(s=><li key={s.number}>{s.step}</ li>)}

                </ol>: 
                <p className={s.aviso}>The recipe haven't steps</p>};
            </div>

          </div>
  
        </div>

      </div>


    );
  } else {
    return (<Loading />)
  }

}