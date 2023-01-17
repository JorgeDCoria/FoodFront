import React, { useEffect, useState } from "react";
import dietService from '../../../../services/diet/diet.service';
import { filterRecipeByDiet, orderRecipe } from '../../../../redux/action/action';
import { useDispatch } from "react-redux";
import s from "./aside.module.css";
import Select from "../../../../components/Select/Select";

export default function Aside({ setPagina }) {
  const [diets, setDiets] = useState([]);
  const [selectOrder, setSelectOrder] = useState('');
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    dietService.getAllDiets()
    .then(r => {
      if(isMounted) setDiets(r);
    });
    return ()=>{
      isMounted = false;
    }

  }, [])

  const filterByDiet = (e) => {
    if (e.target.value !== '')
      dispatch(filterRecipeByDiet(e.target.value));
    setOrder(null);

  }

  const handleSelectOrder = (e) => {
    if (e.target.value !== '') {
      let value;
      e.target.value === "Title" ? value = 'title' : value = 'healthScore'
      setSelectOrder(value);
    }

    setOrder(null);
  }

  const handleOrder = (e) => {
    setOrder(e.target.value);
    dispatch(orderRecipe(selectOrder, e.target.value));
    setPagina(1);
  }
  if (diets.length) {
    return (
      <div className={s.container}>
        <h1>Filtros</h1>
        <div className={s.containerselect}>
          <Select name="dieta" handleSelect={filterByDiet} valueSelect='' data={diets} prop='name' valueOption='name' />
          <Select handleSelect={handleSelectOrder} name={"propiedad"} valueSelect={selectOrder} data={["Title", "Health Score"]} prop='' valueOption='' />

          {selectOrder.length !== 0 &&
            <div className={s.check}>
              <label htmlFor="">Ascendente
                <input type="radio" name="order" id="" value={"asc"} checked={order === "asc"} onChange={(e) => handleOrder(e)} />
              </label>
              <label htmlFor="">Descendente
                <input type="radio" name="order" id="" value={"desc"} checked={order === "desc"} onChange={(e) => handleOrder(e)} />
              </label>

            </div>
          }
        </div>

        {!diets.length && <p>Loading</p>}

      </div>
    )
  } else {
    return <h2>Loading...</h2>
  }

}