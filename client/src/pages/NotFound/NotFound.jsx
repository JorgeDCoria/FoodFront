import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import s from './notFound.module.css';
export default function NotFound(){
  const history = useHistory();
  const goToHome = () =>{
    history.push('/home');
  }
  return (
    <div className={s.container}>
      <h1>SORRY, PAGE NOT FOUND</h1>
      <Button className={s.btn} text='HOME' handleClic={goToHome} size="xl" />
    </div>
  );
}