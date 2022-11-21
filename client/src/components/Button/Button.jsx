import React from "react";
import s from "./button.module.css";

export default function Button ({text,handleClic, size}){
 
  return(
    <button className={`${s.container} ${size==="md" && s.md} ${size==="xl" && s.xl}`}>
      {text}
    </button>
  );
}