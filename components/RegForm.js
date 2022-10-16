import Axios from "axios";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import { useState } from "react";
export default function RegForm({navigation}) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Age, setAge] = useState("");
  const [Mobile, setMobile] = useState("");
  const PostData = async () => {
    if(Name==="" || Age==="" || Email==="" || Password==="" || Mobile==="")
    alert("Please fill all details")
    else{
    const res = await Axios.post(
      "http://localhost:3001/UserReg",
      { Name, Age, Mobile, Email, Password },
      (err) => {
        if (err) console.log(err);
      }
    );
      
    alert("Congratulations, You have been successfully regstered");
    navigation.navigate("LogIn");
    
    
    }
  };
  return (
    <View style={styles.container}>
    
      <TextInput
        style={styles.InputBox}
        type="text"
        placeholder="Enter Name"
        onChangeText={(e) => setName(e)}
      />

      <TextInput
        style={styles.InputBox}
        type="text"
        placeholder="Enter E-mail ID"
        id="Email"
        onChangeText={(e) => setEmail(e)}
      />

      <TextInput
        style={styles.InputBox}
        type="text"
        placeholder="Password"
        secureTextEntry={true}
        value={Password}
        onChangeText={(e) => setPassword(e)}
      />

      <TextInput
        style={styles.InputBox}
        placeholder="Enter Mobile Number"
        onChangeText={(e) => setMobile(e)}
      />

      <TextInput
        style={styles.InputBox}
        keyboardType='numeric'
        placeholder="Enter Age"
        onChangeText={(e) => setAge(e)}
      />
      <View style={styles.Button}>
      <Button       
        title="Submit"
        onPress={PostData}
      />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width:'30%',
    height:'90%',
    color: "black",
    border:'1px solid grey',
    marginLeft:'20%',
    shadowRadius:'7px',
    borderRadius:'10px',
    borderColor: "2px solid black",
    marginBottom:'5%',
    marginTop:'2%'
  },

  InputBox: {
    width: "80%",
    margin: "20px",
    marginLeft:'10%',
    border: "2px solid grey",
    height: "80px",
    borderRadius: "10px",
    textAlign: "center",
  },
  Button: {
    width: "40%",
    marginLeft:'30%',
    marginBottom:'5%',
    color: "red",
  },
});
