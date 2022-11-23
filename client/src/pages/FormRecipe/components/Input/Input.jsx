import React from "react";
import s from './input.module.css';
export default function Input({nameInput, typeInput, valueInput, handleChange}){
  return(
    <div className={s.container}>
      <label className={s.label} htmlFor={nameInput}>
       { nameInput[0].toUpperCase() + nameInput.substring(1)}  
      </label> 
      <input placeholder={nameInput} className={s.input} id={nameInput} type={typeInput} name={nameInput} value={valueInput} onChange={(e)=>handleChange(e)} />   
    </ div>
  )
}