import React from "react";

export default function Input({nameInput, typeInput, valueInput, handleChange}){
  return(
    <>
      <label htmlFor={nameInput}>
       { nameInput[0].toUpperCase() + nameInput.substring(1)} <input id={nameInput} type={typeInput} name={nameInput} value={valueInput} onChange={(e)=>handleChange(e)} /> 
      </label>    
    </>
  )
}