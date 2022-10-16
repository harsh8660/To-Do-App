import RegForm from "./RegForm";
import Login from "./LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import Task from "./ToDo";
export default function Ui() {
  const [Id, setId] = useState();
  const Stack = createNativeStackNavigator();
  function getId() {
    AsyncStorage.getItem("Id").then((val) => {
      if (val > 0) {
        setId(val);
        console.log(Id);
      } else navigation.navigate("LogIn");
    });
  }
  
  return (
    <NavigationContainer>
      
      
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Task} />
          <Stack.Screen name="RegForm" component={RegForm} />
          <Stack.Screen name="LogIn" component={Login} />
        </Stack.Navigator>
    
    </NavigationContainer>
  );
}
