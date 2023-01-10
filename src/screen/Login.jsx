import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/native";
// import { auth } from "../common/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth/react-native";
import { emailRegex, pwRegex, width } from "../common/utils";

export default function Login({ navigation: { goBack, setOptions } }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const validateInputs = () => {
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }
  };
  const handleLogin = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 로그인 요청
    signInWithEmailAndPassword(auth, email, pw)
      .then(() => {
        console.log("로그인성공");
        setEmail("");
        setPw("");
        goBack();
        // 로그인 화면 이전 화면으로 돌아가기
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  const handleRegister = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 회원가입 요청
    createUserWithEmailAndPassword(auth, email, pw)
      .then(() => {
        console.log("로그인성공");
        setEmail("");
        setPw("");
        goBack();
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("already-in-use")) {
          alert("이미 사용중인 아이디입니다.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <Around>
      <TitleText>Login</TitleText>
      <InputBox>
        <LoginBox
          ref={emailRef}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#d2dae2"
          textContentType="emailAddress"
          placeholder="Enter your email id"
        />
        <LoginBox
          ref={pwRef}
          value={pw}
          onChangeText={(text) => setPw(text)}
          placeholderTextColor="#d2dae2"
          textContentType="password"
          returnKeyType="send"
          secureTextEntry={true}
          placeholder="Enter your password"
        />
      </InputBox>

      <LoginButton onPress={handleLogin}>
        <LoginButtonText>Login</LoginButtonText>
      </LoginButton>

      <JoinButton onPress={handleRegister}>
        <JoinButtonText>Join</JoinButtonText>
      </JoinButton>
    </Around>
  );
}

const Around = styled.View`
  margin: 150px auto 150px;
  display: flex;
  justify-content: center;
`;

const TitleText = styled.Text`
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: 900px;
  margin-bottom: 25px;
`;

const LoginBox = styled.TextInput`
  display: flex;
  justify-content: center;
  background-color: #ffeb7a;
  color: whitesmoke;
  width: 250px;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 30px;
  font-size: 25px;
`;

const InputBox = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const LoginButton = styled.TouchableOpacity`
  display: flex;

  width: 120px;
  height: 30px;
  background-color: #ffeb7a;
  border-radius: 10px;
  justify-content: center;
  margin: 0 auto;
`;
const LoginButtonText = styled.Text`
  font-size: 20px;
  color: black;
  text-align: center;
`;

const JoinButton = styled.TouchableOpacity`
  display: flex;

  width: ${width / 1.5 + "px"};
  height: 30px;
  background-color: #ffeb7a;
  border-radius: 10px;
  justify-content: center;
  margin: 0 auto;
`;

const JoinButtonText = styled.Text`
  font-size: 20px;
  color: black;
  text-align: center;
`;
