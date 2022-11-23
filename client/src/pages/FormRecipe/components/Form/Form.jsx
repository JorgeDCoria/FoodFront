import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../Input/Input";
import dietService from "../../../../services/diet/diet.service";
import { saveRecipes } from '../../../../redux/action/action';
import s from './form.module.css';
import Notification from "../Notification/Notification";
import Select from "../../../../components/Select/Select";
import Loading from '../../../Loading/Loading';
import Button from '../../../../components/Button/Button';
import { useHistory } from "react-router-dom";
//import { useForm } from "../../hooks/useForm";

// const initialInpu = {};
// const validationForm = (input)=>{

// }
const ExpRegLetrasEspacio = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
const validar = (input) => {
  let errors = {};
  if (input.title === '') {
    errors.title = `Please, into title to recipe`;
  }
  if (input.title.match(ExpRegLetrasEspacio) === null) errors.title = `The title must not contain symbols`;
  if (input.healthScore > 100 || input.healthScore < 0 || !input.healthScore) {
    errors.healthScore = "Health Score should be betwen 0-100";
  }
  if (!input.summary) {
    errors.summary = "Please, into Summary"
  }
  if (!input.diets.length) {
    errors.diets = "Please, choose diet"
  }
  if (!input.steps.length) {
    errors.steps = "Please, into steps"
  }

  return errors;
}

export default function Form() {
  //diets for control select
  const [diets, setDiets] = useState(null);
  //variable dietsAux to save diets that do not repeat
  const [dietsAux, setDietsAux] = useState(new Set());
  const [step, setStep] = useState('');
  //variable to save recipes before sending
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // const {
  //   input,
  //   errors,
  //   loading,
  //   response,
  //   handleChange,
  //   handleBur,
  //   handleSubmit
  // } = useForm();

  const [input, setInput] = useState({
    title: "",
    healthScore: 0,
    summary: "",
    image: "",
    steps: [],
    diets: []

  });

  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
    setErrors(validar({ ...input, [name]: value }));
  }


  const handleStep = (e) => {
    setStep(e.target.value);
  }

  const handleAddStepClic = (e) => {
    e.preventDefault();
    if (step !== '') {
      let aux = { number: input.steps.length + 1, step: step }
      setInput({ ...input, steps: [...input.steps, aux] });
      setErrors(validar({ ...input, steps: [...input.steps, aux] }));
    } else {
      setErrors({ ...errors, steps: "Please Into step to continue" });
    }

    setStep('');
  }

  const addRecipe = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(errors));
    if (!Object.getOwnPropertyNames(errors).length) {
      setRecipes([...recipes, input])
      setInput({
        title: "",
        healthScore: 0,
        summary: "",
        image: "",
        steps: [],
        diets: []
      });
      setDietsAux(new Set());
    } else {
      alert("Complete all the fields of the Form before submitting it");
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (recipes.length) {
      dispatch(saveRecipes(recipes));
      alert("Data sabe successful");
      history.push('/home');
    } else {
      alert("You Should add recipes before submitting");
    }
  }
  useEffect(() => {
    dietService.getAllDiets().then(r => setDiets(r))
  }, [])

  // const deleteDiet = (diet)=>{
  //   setDietsAux(dietsAux.delete(diet));
  //   setInput({...input, diets: input.diets.filter(d => d != diet)});
  // }

  const addDiets = (e) => {
    if (e.target.value !== '') {
      setDietsAux(dietsAux.add(e.target.value));
      setInput({ ...input, diets: Array.from(dietsAux) });
      setErrors(validar({ ...input, diets: Array.from(dietsAux) }));
    }
  }

  const handleCancel = () =>{
    alert("Are you sure to cancel operation, the loaded recipes will be lost ");
    history.push('/home');
  }



  if (diets) {
    return (
      <form className={s.container} action="" onSubmit={handleSubmit}>
        <h1>ADD RECIPES</h1>

        <Input nameInput="title" typeInput='text' valueInput={input.title} handleChange={(e) => handleChange(e)} />
        {errors.title ? <Notification message={errors.title} succces={false} /> : <Notification message={'Succes'} succes={true} />}
        <Input nameInput='healthScore' typeInput='number' valueInput={input.healthScore} handleChange={handleChange} />
        {errors.healthScore ? <Notification message={errors.healthScore} succces={false} /> : <Notification message={'Succes'} succes={true} />}
        <Input nameInput='image' typeInput='text' valueInput={input.image} handleChange={handleChange} />
        {/* ########## text area ############# */}
        <textarea className={s.summary} name='summary' value={input.summary} onChange={handleChange} placeholder='Write a resumen'></textarea>
        {errors.summary ? <Notification message={errors.summary} succces={false} /> : <Notification message={'Succes'} succes={true} />}

        {/* ######## dieta ####### */}
        <div className={s.containerdiets}>
          <h2>DIETS</h2>
          <div className={s.subcontainerdiets}>
            <Select
              handleSelect={(e) => addDiets(e)}
              name={'diets'}
              data={diets}
              prop={'name'}
              valueOption={'name'}
              valueSelected={''}
            />
            <div className={s.diets}>
              {input.diets.length !== 0 &&
                <ul className={s.dietslist}>
                  {
                    input.diets.map((diet, i) =>
                      <li className={s.dietli} key={i}>
                        <span>{diet}</span>
                        {/* <button onClick={deleteDiet(diet)}> X</button> */}
                        {/* <svg onClick={(diet) => deleteDiet(diet)}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e43f3f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>  */}
                      </li>)
                  }
                </ul>}
            </div>
          </div>

        </div>
        {errors.diets ? <Notification message={errors.diets} succces={false} /> : <Notification message={'Succes'} succes={true} />}

        {/* ############## steps ################## */}
        <div className={s.containersteps}>
          <h2 className={s.stepstitle}>STEPS</h2>
          <div className={s.stepscontrol}>
            <Input nameInput="step" typeInput="text" valueInput={step} handleChange={handleStep} />
            <div className={s.stepssubcontrol}>
              <Button text='ADD STEP' handleClic={(e) => handleAddStepClic(e)} size='md' />
              {errors.steps ? <Notification message={errors.steps} succces={false} /> : <Notification message={'Succes'} succes={true} />}
            </div>
          </div>
          <div className={s.stepslist}>
            {input.steps.length !== 0 && input.steps.map((e) => <p className={s.stepitem} key={e.number}>step:{e.number} - {e.step}</p>)}
          </div>
        </div>
        <Button text='ADD RECIPE' handleClic={addRecipe} size='xl' />
        <p>You can generate as many recipes as you want. Once finished press FINISH to save the changes cambios</p>
        <div className={s.containerrecipes}>
          <h2>List</h2>
          {recipes.length!==0 && recipes.map((e, i) => <pre className={s.pre} key={i}>{JSON.stringify(e, null, 2)}</pre>)}
        </div>
        <div className={s.groupbutton}>
          <button onClick={()=>handleCancel()} className={`${s.btn} ${s.cancelar}`} >Cancelar</button>
          <button className={s.btn} type="submit">Finalizar y Guardar</button>

        </div>




      </form>


    );

  } else {
    return <Loading />
  }
}