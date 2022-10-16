import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TaskInputField from "./TextInput";
import TaskItem from "./TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Task({ navigation }) {
  const LogOut = async () => {
    await AsyncStorage.removeItem("Id");
    alert("Logged Out");
    navigation.navigate("LogIn");
  };

  const getId=()=>{
    const res=AsyncStorage.getItem("Id").then((val)=>{
      if(val<=0)
      navigation.navigate("LogIn");
    })
  }
  useEffect(()=>{
    getId();
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        <View>
          <TaskItem />
        </View>
      </ScrollView>
      <TaskInputField />
        <View  style={styles.LogOut} >
          <Button onPress={LogOut} title="LogOut" />
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1A3C",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  LogOut: {
    bottom: "15px",
    height: "50px",
    marginLeft: "70%",
    width: "20%",
  },
});
