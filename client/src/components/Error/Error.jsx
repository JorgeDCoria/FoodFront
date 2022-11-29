import React from "react";
import s from "./error.module.css";
import image from "../../assets/error.jpg";

export default function Error ({message}){
  return (
    <div className={s.container}>
      <img src={image} alt="" />
      <p >{message}</p>

    </div>
  );
}