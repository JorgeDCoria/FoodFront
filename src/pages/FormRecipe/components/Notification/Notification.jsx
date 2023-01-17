import React from "react";
import s from './notification.module.css';
export default function Error({message, succes}){

  return (
    <p className={`${s.container} ${succes ? s.succes: s.error} `}>{message}</p>
  );
};