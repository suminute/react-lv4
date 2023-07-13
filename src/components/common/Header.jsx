import React, { useEffect, useState } from "react";
import ButtonComp from "./ButtonComp";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/modules/userSlice";
import { login, logout } from "../../redux/modules/tokenSlice";
import jwtDecode from "jwt-decode";
import { styled } from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // auth.onAuthStateChanged(async (user) => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(getUser({ userId: user.uid, displayName: user.displayName }));
        dispatch(login(token));
        setIsLogin(true);
      } else {
        dispatch(getUser(null));
        setIsLogin(false);
      }
    });
  }, []);

  const checkTokenExpiration = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      try {
        const expirationTime = jwtDecode(token).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (expirationTime < currentTime) {
          dispatch(logOut());
          alert("토큰이 만료되어 로그아웃 되었습니다");
          await signOut(auth);
          navigate(0);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  setInterval(checkTokenExpiration, 60000);

  const logOut = async () => {
    await signOut(auth);
    dispatch(getUser(null));
    dispatch(logout());
    navigate("/");
  };

  return (
    <StHeader>
      <StDiv>
        <div
          onClick={() => {
            navigate("/");
          }}
          className='title'
          style={{ cursor: "pointer" }}>
          Activerve
        </div>
        <nav>
          {isLogin ? (
            <ButtonComp onClick={logOut}>로그아웃</ButtonComp>
          ) : (
            <>
              <ButtonComp onClick={() => navigate("/login")}>로그인</ButtonComp>
              <ButtonComp onClick={() => navigate("/signup")}>회원가입</ButtonComp>
            </>
          )}
        </nav>
      </StDiv>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  min-width: 992px;
`;
const StDiv = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  & .title {
    display: flex;
    position: absolute;
    font-size: 32px;
    justify-content: center;
    align-items: center;
  }

  & nav {
    position: absolute;
    right: 16px;
  }
`;
