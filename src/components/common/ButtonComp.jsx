import React from "react";
import { Button } from "@mui/material";

const ButtonComp = ({ type, onClick, children, disabled }) => {
  let buttonStyle = { size: "small", variant: "contained" };
  if (children === "글 작성하기") {
    buttonStyle = { size: "large", variant: "contained", color: "secondary" };
  } else if (children === "로그인") {
    buttonStyle = { size: "small", variant: "outlined" };
  } else if (children === "수정") {
    buttonStyle = { size: "small", variant: "outlined", color: "warning" };
  } else if (children === "삭제") {
    buttonStyle = { size: "small", variant: "outlined", color: "error" };
  } else if (children === "로그아웃") {
    buttonStyle = { size: "small", variant: "outlined" };
  } else if (children === "저장") {
    buttonStyle = { size: "small", variant: "contained" };
  } else if (children === "닫기") {
    buttonStyle = { size: "small", variant: "outlined" };
  } else if (children === "메인페이지") {
    buttonStyle = { size: "small", variant: "outlined" };
  } else if (children === "X") {
    buttonStyle = { size: "small", variant: "text", color: "warning" };
  }
  return (
    <Button type={type} onClick={onClick} disabled={disabled} sx={{ margin: "5px" }} {...buttonStyle}>
      {children}
    </Button>
  );
};

export default ButtonComp;
