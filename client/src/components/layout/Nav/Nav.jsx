import React from "react";
import {Link} from "react-router-dom";
export default function Nav (){
  return(
    <div>
      <ul>
        <li><Link to='/home'>Home</Link> </li>
        <li><Link to='/formRecipe'>Add Recipe</Link></li>
        <li></li>
      </ul>
    </div>
  );
}