import Axios from "axios";
import { useState } from "react";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login({navigation}) {
    
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const Register=()=>{
    navigation.navigate("RegForm")
  }
  const CheckLogin = async () => {
    const res = await Axios.post("http://localhost:3001/CheckLogin", {
      UserName,
      Password,
    });
    if (res.data.message) alert(res.data.message);
    else {
      
      AsyncStorage.setItem('Id',res.data[0].userid)
    console.log(res.data[0].userid)
    
    navigation.navigate("Home",{Id:`${res.data[0].Id}`})
    }
  };
  return (
    <View style={styles.LoginBlock}>
      <TextInput
      
        style={styles.InputBox}
        placeholder="UserName"
        onChangeText={(e) => setUserName(e)}
      />
      <TextInput
        style={styles.InputBox}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
      />
      
      <View style={styles.Button}>
      <Button title="Login" onPress={CheckLogin} />
      </View>
      
      <View style={styles.Button}><Button color="red" title="New User?Register" onPress={Register}/></View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  LoginBlock: {
    width: "25%",
    marginLeft: "10%",
    marginTop:'5%',
    height: "70%",
    borderRadius:'10px',
    shadowRadius:'7px',
    paddingVertical:'5'
  },
  InputBox: {
    width: "60%",
    marginLeft:'20%',
    height:"9%",
    border: "2px solid grey",
    margin:'20px',
    borderRadius: "5px",
    textAlign: "center",
  },
  Button:{
    width:'40%',
    height:'6%',
    marginLeft:'29%',
    marginBottom:'50px',
    borderRadius:'10px'
  }
});
