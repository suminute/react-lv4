import React, { useEffect, useState } from "react";
import ButtonComp from "../components/common/ButtonComp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/modules/userSlice";

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

  const logIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      dispatch(getUser(user.uid));
      navigate("/");
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
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>아이디</label>
        <input value={email} onChange={onChangeEmailHandler} />
      </div>
      <div>
        <label>비밀번호</label>
        <input value={password} type='password' onChange={onChangePasswordHandler} />
      </div>
      <ButtonComp type={"submit"} onClick={logIn} disabled={disabled}>
        로그인
      </ButtonComp>
      <ButtonComp onClick={() => navigate("/signup")}>회원가입</ButtonComp>
    </form>
  );
};

export default Login;
