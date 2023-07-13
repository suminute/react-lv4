import React, { useEffect, useState } from "react";
import ButtonComp from "../components/common/ButtonComp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/modules/userSlice";
import { styled } from "styled-components";
import { TextField } from "@mui/material";

const Login = () => {
  const [email, onChangeEmailHandler] = useInput("");
  const [password, onChangePasswordHandler] = useInput("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    }
  }, [email, password]);

  // 로그인
  const logIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      dispatch(getUser({ displayName: user.displayName, userId: user.uid }));
      navigate(-1);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          return alert("올바른 이메일 형식을 입력하세요");
        case "auth/wrong-password":
          return alert("비밀번호가 틀렸습니다");
        case "auth/user-not-found":
          return alert("존재하지 않는 이메일입니다");
      }
    }
  };

  return (
    <StDiv>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <TextField id='standard-helperText' label='ID' helperText='이메일 형식으로 입력하세요' variant='standard' value={email} onChange={onChangeEmailHandler} sx={{ width: "300px" }} />
          </div>
          <div>
            <TextField
              id='standard-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              variant='standard'
              value={password}
              onChange={onChangePasswordHandler}
              sx={{ width: "300px" }}
            />
          </div>
          <StFlexDiv>
            <ButtonComp type={"submit"} onClick={logIn} disabled={disabled}>
              로그인
            </ButtonComp>
            <ButtonComp onClick={() => navigate("/signup")}>회원가입</ButtonComp>
            <ButtonComp onClick={() => navigate("/")}>메인페이지</ButtonComp>
          </StFlexDiv>
        </form>
      </div>
    </StDiv>
  );
};

export default Login;

const StDiv = styled.div`
  min-height: 90vh;
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
