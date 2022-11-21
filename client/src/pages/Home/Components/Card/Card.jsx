import React from "react";
import GroupDiet from "./components/GroupDiet/GroupDiet";
import s from './card.module.css';

export default function Card({data}){
  const {title, image, healthScore, diets} = data;
 
  return(
    <div className={s.container}>
      <p className={s.title}>{title}</p>
      <div className={s.containerimage}> 
         <img className={s.image} src={image} alt="" />
        <div className={s.healthScore}>
          <p className={s.number}>{healthScore}</p>
          <p className={s.healthtitle}>Healt Score</p>
        </div>
      </div>
      <div className={s.containerdiets}>
      {diets.length ? <GroupDiet data={diets}/> :<p>No contiene tipo de Dieta</p>}
      </div>
    </div>
  );
}