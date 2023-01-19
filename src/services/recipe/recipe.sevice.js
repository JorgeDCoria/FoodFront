import axios from "axios";
const URL = process.env.REACT_APP_URL;

const recipeService = {};
recipeService.findRecipeByName = async (title) => {
  try {
    const data = await axios
      .get(`${URL}recipes/findBytitle?title=${title}`)
      .then((r) => r.data);
    if (data.status === "Ok") return true;
    return false;
  } catch (e) {
    alert("Error server " + e.message);
  }
};

export default recipeService;
