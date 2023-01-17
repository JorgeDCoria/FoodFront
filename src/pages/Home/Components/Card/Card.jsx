import React from "react";
import GroupDiet from "./components/GroupDiet/GroupDiet";
import {Link} from 'react-router-dom';
import s from './card.module.css';

export default function Card({data}){
  const { id, title, image, healthScore, diets} = data;
 
  return(
    <div className={s.container}>
      <p className={s.title}>{title}</p>
      <div className={s.containerimage}> 
         <img className={s.image} src={image} alt="" />
        <div className={s.healthScore}>
          <p className={s.number}>{healthScore}</p>
          <p className={s.healthtitle}>Healt Score</p>
        </div>
        <Link to={`/detail/${id}`}><div className={s.backhover}><h2>SEE DETAIL</h2></div></Link>
      </div>
      <div className={s.containerdiets}>
      {diets.length ? <GroupDiet data={diets}/> :<p>No contiene tipo de Dieta</p>}
      </div>
    </div>
  );
}