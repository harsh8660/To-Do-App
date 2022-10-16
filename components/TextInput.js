import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskInputField = ({ navigation }) => {
  const [Id, setId] = useState();

  const [task, setTask] = useState();

  function getId() {
    AsyncStorage.getItem("Id").then((val) => {
      if (val > 0) {
        setId(val);
        console.log(Id);
      } 
    });
  }

  const Uploadtask = async () => {
    console.log("pppppp===" + task);
    console.log("Id=" + Id);
    const res = await Axios.post(`http://localhost:3001/UploadTask`, {
      task,
      Id,
    });
    setTask(null);
    location.reload()
    console.log(res);
  };
  useEffect(() => {
    getId();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.inputField}
        defaultValue={task}
        onChangeText={(text) => setTask(text)}
        placeholder={"Write a task"}
        placeholderTextColor={"#fff"}
      />
      <TouchableOpacity style={{backgroundColor:'red'}} onPress={Uploadtask}>
        <View style={styles.button}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#fff",
    backgroundColor: "#3E3364",
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 20,
  },
  inputField: {
    color: "#fff",
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TaskInputField;
