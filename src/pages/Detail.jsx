import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <p>디테일 페이지</p>
      <p>{id}</p>
    </div>
  );
};

export default Detail;
