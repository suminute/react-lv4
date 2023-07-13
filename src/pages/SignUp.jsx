import React, { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import ButtonComp from "../components/common/ButtonComp";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUser, getUsers } from "../api/users";
import { styled } from "styled-components";
import { TextField, Typography } from "@mui/material";

const SignUp = () => {
  const [email, onChangeEmailHandler] = useInput("");
  const [password, onChangePasswordHandler] = useInput("");
  const [confPassword, onChangeConfPasswordHandler] = useInput("");
  const [userName, onChangeUserNameHandler] = useInput("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("posts", getUsers);

  const validateDuplicateEmail = (email) => {
    let isTrue = true;
    data.map((user) => {
      if (user.email === email) {
        return (isTrue = false);
      } else {
        return isTrue;
      }
    });
    return isTrue;
  };

  const validateEmail = (email) => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // return regex.test(email);
    if (regex.test(email)) {
      if (validateDuplicateEmail(email)) {
        return "사용 가능한 이메일입니다";
      } else {
        return "이미 사용중인 이메일입니다";
      }
    } else {
      return "이메일 형식에 맞게 입력해 주세요";
    }
  };

  const validateEmailBool = (email) => {
    let isTrue = true;
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // return regex.test(email);
    if (regex.test(email)) {
      if (validateDuplicateEmail(email)) {
        return isTrue;
      } else {
        return (isTrue = false);
      }
    } else {
      return (isTrue = false);
    }
  };

  const validatePassword = (password, confPassword) => {
    if (password === confPassword) {
      return "비밀번호가 일치합니다";
    } else {
      return "비밀번호가 일치하지 않습니다";
    }
  };

  useEffect(() => {
    if (validateEmail(email) && password.length >= 8 && confPassword === password) {
      setDisabled(false);
    }
  }, [email, password, confPassword]);

  const queryClient = useQueryClient();
  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: userName });
      const newUser = { email };
      mutation.mutate(newUser);
      navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("이미 사용중인 이메일입니다");
        default:
          alert("회원가입 실패");
      }
    }
  };

  return (
    <StDiv>
      <form onSubmit={(e) => e.preventDefault()}>
        <Typography variant='h5' align='center' sx={{ marginBottom: "50px" }}>
          회원가입
        </Typography>
        <div>
          <TextField
            error={validateEmailBool(email) ? false : true}
            id='standard-error-helper-text'
            label='아이디'
            value={email}
            helperText={validateEmail(email)}
            variant='standard'
            onChange={onChangeEmailHandler}
            margin='normal'
            sx={{ width: "300px" }}
          />
        </div>
        <div>
          <TextField
            error={userName.length < 2 ? true : false}
            id='standard-error-helper-text'
            label='이름'
            value={userName}
            helperText='2글자 이상 입력해 주세요'
            variant='standard'
            onChange={onChangeUserNameHandler}
            margin='normal'
            sx={{ width: "300px" }}
          />
        </div>
        <div>
          <TextField
            error={password.length < 8 ? true : false}
            id='standard-error-helper-text'
            label='비밀번호'
            value={password}
            helperText='8글자 이상 입력해 주세요'
            variant='standard'
            onChange={onChangePasswordHandler}
            margin='normal'
            sx={{ width: "300px" }}
          />
        </div>
        <div>
          <TextField
            error={confPassword !== password ? true : false}
            id='standard-error-helper-text'
            label='비밀번호 확인'
            value={confPassword}
            helperText={validatePassword(password, confPassword)}
            variant='standard'
            onChange={onChangeConfPasswordHandler}
            margin='normal'
            sx={{ width: "300px" }}
          />
        </div>
        <StFlexDiv>
          <ButtonComp disabled={disabled} onClick={signUp}>
            가입하기
          </ButtonComp>
          <ButtonComp onClick={() => navigate("/")}>메인페이지</ButtonComp>
        </StFlexDiv>
      </form>
    </StDiv>
  );
};

export default SignUp;

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
  margin-top: 50px;
`;
