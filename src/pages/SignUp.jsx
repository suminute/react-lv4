import React, { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import ButtonComp from "../components/common/ButtonComp";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUser, getUsers } from "../api/users";

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
        return <p>사용 가능한 이메일입니다</p>;
      } else {
        return <p>이미 사용중인 이메일입니다</p>;
      }
    } else {
      return <p>이메일 형식에 맞게 입력해 주세요</p>;
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
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>회원가입 페이지</h2>
      <div>
        <label>아이디</label>
        <input value={email} onChange={onChangeEmailHandler} />
        {validateEmail(email)}
      </div>
      <div>
        <label>이름</label>
        <input value={userName} onChange={onChangeUserNameHandler} />
        {userName.length < 2 && <p>2글자 이상 입력해 주세요</p>}
      </div>
      <div>
        <label>비밀번호</label>
        <input type='password' value={password} onChange={onChangePasswordHandler} />
        {password.length < 8 && <p>8글자 이상 입력해 주세요</p>}
        {password.length >= 8 && <p>사용가능한 비밀번호입니다</p>}
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input type='password' value={confPassword} onChange={onChangeConfPasswordHandler} />
        {confPassword !== password && <p>입력하신 비밀번호와 일치하지 않습니다</p>}
        {confPassword === password && <p>비밀번호가 일치합니다</p>}
      </div>
      <ButtonComp disabled={disabled} onClick={signUp}>
        가입하기
      </ButtonComp>
      <ButtonComp onClick={() => navigate("/")}>메인페이지</ButtonComp>
    </form>
  );
};

export default SignUp;
