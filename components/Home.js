import { View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import Task from "./ToDo";
import { Button } from "react-native";
export default function Home({ route, navigation }) {
    const [data,setData]=useState({
        Name:"",
    })
  let {Id}=-1;
  const getData = async () => {
    console.log(Id)
    const res = await Axios.post(`http://localhost:3001/getData`, { Id });
    console.log(res.data.user[0]);
    setData(res.data.user[0])
  };
  const getId = () => {
    AsyncStorage.getItem("Id").then((val) => {
      if (val != null) {
        Id = val;
        console.log(Id)
        getData();
      }
    });
  };
  const LogOut = async () => {
    console.log("logg");
    await AsyncStorage.removeItem("Id");
    alert("Logged Out");
    navigation.navigate("LogIn");
  };
  useEffect(() => {
    getId();
  }, []);

  return (
    <View>
      <Task/>
      <br/>
      
    </View>
  );
}
