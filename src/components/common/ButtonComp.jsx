import React from "react";
import { Button } from "@mui/material";

const ButtonComp = ({ type, onClick, children, disabled }) => {
  const buttonStyle = { size: "small", variant: "outlined" };
  return (
    <Button type={type} onClick={onClick} disabled={disabled} {...buttonStyle}>
      {children}
    </Button>
  );
};

export default ButtonComp;
