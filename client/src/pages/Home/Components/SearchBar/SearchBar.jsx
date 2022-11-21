import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button/Button";
import { filterRecipeByTitle } from "../../../../redux/action/action";
import s from "./searchBar.module.css"

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterRecipeByTitle(search));
    setSearch('');
  }
  return (

    <form className={s.container} onSubmit={(e) => handleSubmit(e)}>
      <div className={s.containerinput}>
      <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007342" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input className={s.inputsearch} type="text" name="search" value={search} onChange={(e) => handleChange(e)} id="" />

      </div>
      <Button size="md" handleClic={null} text="BUSCAR"></Button>
    </form>

  );
}