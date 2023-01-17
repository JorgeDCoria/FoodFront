import React from "react";
import imageLoading from '../../assets/loading.gif';
export default function Loading(){

  return(
    <div>
      <img src={imageLoading} alt="loading gif" />
      <h1>Loading...</h1>
    </div>
  )
}