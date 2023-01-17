import React from "react";
import s from './groupDiet.module.css';
import Diet from "../Diet/Diet";
export default function GroupDiet ({data}){

  return (
    <div className={s.container}>
      {data.map((e,i) => <Diet key={i} text={e} />)}
    </div>
  );
}