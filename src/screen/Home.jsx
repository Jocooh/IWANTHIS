import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "../components/Category";
import { auth } from '../common/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin, notLogin } from '../redux/modules/loginSlice';

const Home = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const checkLogin = useSelector(state => state.login.isLogin)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(isLogin())
      } else {
        dispatch(notLogin())
      }
    });
  }, []);

  return (
    <ScrollView>
      <Category navigation={navigate} />
    </ScrollView>
  );
};

export default Home;
