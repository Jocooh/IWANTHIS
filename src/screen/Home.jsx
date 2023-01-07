import { ScrollView } from "react-native";
import React from "react";
import Category from "../components/Category";

const Home = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <Category navigation={navigate} />
    </ScrollView>
  );
};

export default Home;
