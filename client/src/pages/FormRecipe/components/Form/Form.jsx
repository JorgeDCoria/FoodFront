import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../Input/Input";
import dietService from "../../../../services/diet/diet.service";
import {saveRecipes} from '../../../../redux/action/action';

export default function Form() {
  //diets for control select
  const [diets, setDiets] = useState(null);
  //variable dietsAux to save diets that do not repeat
  const [dietsAux, setDietsAux] = useState(new Set());
  const [step, setStep] = useState('');
  //variable to save recipes before sending
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    healthScore: 0,
    summary: "",
    image:"",
    steps: [],
    diets: []

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
    console.log(`name ${name} y value ${value}`)
  }

  const handleStep = (e) => {
    setStep(e.target.value);
  }

  const handleAddStepClic = (e) => {
    console.log(step);
    e.preventDefault();
    let aux = {number: input.steps.length +1, step: step}
    setInput({ ...input, steps: [...input.steps, aux] });
    setStep('');
  }

  const addRecipe = (e) => {
    e.preventDefault();
    setRecipes([...recipes, input])
    setInput({
      title: "",
      healthScore: 0,
      summary: "",
      image:"",
      steps: [],
      diets: []
    });
    setDietsAux(new Set());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveRecipes(recipes));


  }
  useEffect(() => {
    dietService.getAllDiets().then(r => setDiets(r))
  }, [])
  const addDiets = (e) => {
    setDietsAux(dietsAux.add(e.target.value));
    setInput({ ...input, diets: Array.from(dietsAux) });
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <h1>soy form de altas</h1>
      <Input nameInput="title" typeInput='text' valueInput={input.title} handleChange={handleChange} />
      <Input nameInput='healthScore' typeInput='number' valueInput={input.healthScore} handleChange={handleChange} />
      <Input nameInput = 'image' typeInput='text' valueInput={input.image} handleChange={handleChange} />
      <textarea name='summary' value={input.summary} onChange={handleChange} placeholder='escribe un resumen'></textarea>
      <select name='diets' onChange={addDiets}>
        <option name='' >choose diet</option>
        {diets && diets.map(d => <option key={d.id} value={d.name}  >{d.name}</option>)}
      </select>
      {input.steps.length && input.steps.map((e) => <p key={e.number}>step:{e.number} - {e.step}</p>)}
      <Input nameInput="step" typeInput="text" valueInput={step} handleChange={handleStep} />
      <button onClick={handleAddStepClic}>ADD STEP</button>
      {input.diets.length && input.diets.map((e, i) => <p key={i}>{e}</p>)}
      <button onClick={addRecipe}>ADD RECIPE</button>
      <button type="submit">Guardar</button>

      {recipes.length && recipes.map((e, i) => <p key={i}>{JSON.stringify(e)}</p>)}
    </form>


  );
}