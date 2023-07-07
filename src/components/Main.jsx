import React from "react";

const Main = () => {
  const divCard = { border: "1px solid black", padding: "10px", margin: "10px" };
  return (
    <>
      <div>
        <button>글 작성하기</button>
      </div>
      <div>
        <div style={divCard}>본문</div>
        <div style={divCard}>본문</div>
        <div style={divCard}>본문</div>
      </div>
    </>
  );
};

export default Main;
