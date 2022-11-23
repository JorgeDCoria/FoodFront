import React from "react";
import Form from "./components/Form/Form";
import s from './formrecipe.module.css'
import image from '../../assets/imagePhone.jpg';
import image1 from '../../assets/imageSemillas.jpg';
export default function FormRecipe() {

  return (
    <div className={s.container}>
      <div className={s.subcontainer}>
        <img className={s.imagebuttom} src={image1} alt="" />  
        <img className={s.image} src={image} alt="" />
       <Form />
      </div> 
      
    </div>
  );
}