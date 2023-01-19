import axios from "axios";
const URL = process.env.REACT_APP_URL;

const dietService = {};

dietService.getAllDiets = async () => {
  return await axios.get(`${URL}diets`).then((r) => r.data.data);
};

export default dietService;
