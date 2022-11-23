import React, {useEffect, useState} from "react";
import s from './pagination.module.css'
export default function Pagination({pagina, changePage, totalPaginas, next, prev}) {

  const selectButtons = (currentPage, totalPage, block) => {
    console.log("entrando a component pagination");
    let blockPagination = [1];

    if (totalPage === 1) return blockPagination;

    if (currentPage < block-1) {
      for (let i = 2; i < block; i++) blockPagination.push(i);
    } else if (currentPage >= (totalPage - (block - 1))) {
      for (let i = (totalPage - (block - 2)); i < totalPage; i++) blockPagination.push(i);
    } else {
      for (let i = currentPage - 2; blockPagination.length < block - 1; i++) blockPagination.push(i);
    }

    blockPagination.push(totalPage);

    return blockPagination;
  }

  const totalBlock = totalPaginas >= 7 ? 7 : totalPaginas;
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    setButtons(selectButtons(pagina, totalPaginas, totalBlock));
  }, [pagina, totalPaginas, totalBlock])

  return (
    <div className={s.container}>
      <button className={s.btn} onClick={() => prev()}>&lt;</button>
      {buttons.length && buttons.map((e, i) => <button className={`${s.btn} ${pagina === e && s.current}`} onClick={() => changePage(e)} key={i}>{e}</button>)}
      <button className={s.btn} onClick={() => next()}>&gt;</button>
    </div>
  );
}