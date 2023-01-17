import axios from 'axios';
const URL = "http://localhost:3001/";

const dietService = {};

dietService.getAllDiets = async ()=>{
    return  await axios.get(`${URL}diets`).then(r =>  r.data.data);
}

export default dietService;