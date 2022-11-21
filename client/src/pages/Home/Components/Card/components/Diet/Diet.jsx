import React from "react";
import s from './diet.module.css';
export default function Diet({text}){

  return(
    <button disabled className={s.container}>
      {text}
    </button>
  );
}