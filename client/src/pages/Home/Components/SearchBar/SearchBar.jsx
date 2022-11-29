import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button/Button";
import { cleanError, filterRecipeByTitle, getAllRecipes } from "../../../../redux/action/action";
import s from "./searchBar.module.css"

const ExpRegLetrasEspacio = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
function validate (search){
  let error='';
  if (search === '') {
    error = `Please, into title to find`;
  }
  if (search.match(ExpRegLetrasEspacio) === null) error = `The title must not contain symbols`;

  return error;
}

export default function SearchBar({setPagina}) {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('Please, into title to find');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
    setError(validate(e.target.value));
  }

  const handleClic = () =>{
    dispatch(cleanError());
    dispatch(getAllRecipes());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(error === ''){
      dispatch(cleanError());
      dispatch(filterRecipeByTitle(search));
      setSearch('');
      setError('Please, into title to find')
      setPagina(1);
    }else{
      alert(`Search input failed: ${error}`);
    }
    
  }
  return (
    <div className={s.container}>
       <form className={s.subcontainer} onSubmit={(e) => handleSubmit(e)}>
      <div className={s.containerinput}>
      <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007342" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input className={s.inputsearch} type="text" name="search" value={search} onChange={(e) => handleChange(e)} id="" />

      </div>
      <Button size="md" type='submit' handleClic={null} text="BUSCAR"></Button>
    </form>
    <div className={s.btn}>
      <Button size="md" handleClic={handleClic} text="REFRESH"></Button>
    </div>
    </div>
   

  );
}