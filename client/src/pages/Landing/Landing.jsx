import React from "react";
import { Link } from 'react-router-dom';
import Button from "../../components/Button/Button";
import s from './landing.module.css';
export default function Landing() {
  const handleClic = () => {

  }
  return (
    <div className={s.container}>
      <div className={s.subContainer}>
        <div className={s.section}>
          <h1 className={s.title}>BIENVENIDO A FOOD</h1>
          <div>
            <p className={s.text}>
              La cocina sigue siendo una asignatura pendiente para muchos, sobre todo los platos más caseros,
              los del día a día. Cuando uno se independiza puede sobrevivir al principio a base de menús del
              día, precocinados y pedidos a domicilio, pero todo tiene un límite. Nuestra madre podrá regalarnos
              algunas tarteras con sus delicias de vez en cuando, pero conviene que empecemos pronto a cocinar
              por nuestra cuenta, estableciendo unas rutinas. Puedes aprender esta selección de recetas
              básicas para organizar tus menús completos.


            </p>
            <Link to='/home'><Button text="SEGUIR" handleClic={handleClic} size="xl" /></Link>
          </div>
        </div>
      </div>


    </div>

  );
}