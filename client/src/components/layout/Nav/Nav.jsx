import React from "react";
import {Link} from "react-router-dom";
import s from "./nav.module.css";
export default function Nav (){
  return(
    <div className={s.container}>
      <ul className={s.subcontainer}>
        <li className={s.item}>FOOD</li>
        <Link style={{textDecoration:'none'}} to='/home'>
          <li className={s.item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke=" #93e600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
            Home 
          </li>
        </Link>
        <Link style={{textDecoration:'none'}} to='/formRecipe'>
          <li className={s.item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke=" #93e600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Recipe
          </li>
        </Link>
      </ul>
    </div>
  );
}