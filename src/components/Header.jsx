import React, { useEffect, useState } from "react";
import ButtonComp from "./common/ButtonComp";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { deleteUser, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/modules/userSlice";

const Header = () => {
  const currnetUser = auth.currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        dispatch(getUser(userId));
        setIsLogin(true);
      } else {
        dispatch(getUser(null));
        setIsLogin(false);
      }
    });
  }, []);

  const logOut = async () => {
    await signOut(auth);
    dispatch(getUser(null));
    console.log("로그아웃");
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
