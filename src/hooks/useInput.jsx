import React, { useState } from "react";

const useInput = (inputValue) => {
  const [value, setValue] = useState(inputValue);

  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, handler];
};

export default useInput;
