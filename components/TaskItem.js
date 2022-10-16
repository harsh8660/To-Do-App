import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskItem = ({ navigation }) => {
  const [tasklist, setTaskList] = useState([]);  
  let{Id}=-1;
  const DeleteTask=async (id)=>{
    console.log("TaskId="+id)
    
    const res= await  Axios.delete(`http://localhost:3001/DeleteTask/${id}`)
    console.log(res)
    location.reload();
    
  }
  const getId = () => {
    
    AsyncStorage.getItem("Id").then((val) => {
      if (val>0) {
        Id=val
        getTasks();
        console.log("props="+Id)
      }
      
      
    });
  };

  const getTasks = async () => {
    const res = await Axios.post(`http://localhost:3001/getTask`,{Id});
    console.log(res.data);
    setTaskList(res.data);
  };

  useEffect(() => {
    getId();
  }, []);
  return (
    <View>

      {tasklist.map((val,index) => (
        <View style={styles.container} val={val} key={val.taskid}>
             
          <View style={styles.indexContainer}>
            <Text style={styles.index}>{index+1}</Text>
          </View>
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{val.task}</Text>
            <TouchableOpacity  onPress={()=>DeleteTask(val.taskid)}>
                
              <MaterialIcons
                style={styles.delete}
                name="delete"
                size={18}
                color="#fff"
                
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop:'15px'
  },
  indexContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  index: {
    color: "#fff",
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: "#fff",
    width: "90%",
    fontSize: 16,
  },
  delete: {
    marginLeft: 10,
  },
});
export default TaskItem;
