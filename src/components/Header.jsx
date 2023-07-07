import React from "react";
import Button from "./common/Button";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#FD841F" }}>
      <div>Activerve</div>
      <Button>로그인</Button>
      <Button>회원가입</Button>
    </div>
  );
};

export default Header;
