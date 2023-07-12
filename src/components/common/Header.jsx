import React, { useEffect, useState } from "react";
import ButtonComp from "./ButtonComp";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/modules/userSlice";
import { login, logout } from "../../redux/modules/tokenSlice";
import jwtDecode from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // auth.onAuthStateChanged(async (user) => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const userId = user.uid;
        dispatch(getUser(userId));
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
  };

  return (
    <div style={{ backgroundColor: "#FD841F" }}>
      <div>Activerve</div>
      {isLogin ? (
        <ButtonComp onClick={logOut}>로그아웃</ButtonComp>
      ) : (
        <>
          <ButtonComp onClick={() => navigate("/login")}>로그인</ButtonComp>
          <ButtonComp onClick={() => navigate("/signup")}>회원가입</ButtonComp>
        </>
      )}
    </div>
  );
};

export default Header;
