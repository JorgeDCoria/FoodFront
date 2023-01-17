import React from "react";
import s from './select.module.css';
/**
 * componente de tipo select que recibe por prop las siguientes variables

 * @param {function} handleSelect  function para menejar la function onChange 
 * @param {String} name para establecer el atributo name y la 1era option "Seleccione {name}"
 * @param {Any} valueSelect valor que controla el componente
 * @param {Array<Any>} data array de datos para generar las options
 * @param {String} prop si data es un array de objetos, con "prop" establecemos que propiedad es la que debemos mostrar
 * @param {Any} valueOption valor establecido para las option del select
 * @returns Component
 */
export default function Select({handleSelect, name, valueSelect, data, prop, valueOption}){

  return(
    <select className={s.select} value={valueSelect} onChange={(e)=>handleSelect(e)} name={name}>
      <option value=''>{`Seleccione ${name}`}</option>
      {
      prop ? 
        data.map(e =><option key={e.id} value={e[valueOption]}>{e[prop]}</option>):
        data.map((e,i) => <option key={i} value={e}>{e}</option>)
      }
    </select>
  );

}