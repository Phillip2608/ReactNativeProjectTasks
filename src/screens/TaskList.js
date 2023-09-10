import { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Lato_300Light, Lato_700Bold } from "@expo-google-fonts/lato";
import todayImage from "../../assets/imgs/today.jpg";
import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
import "moment/locale/pt-br";
import Task from "../components/Task";
import AddTask from "./AddTask";

export default function TaskList() {
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState([]);

  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");

  function toggleFilter() {
    setShowDoneTasks(!showDoneTasks, filterTasks());
  }

  function filterTasks() {
    let vTasks = null;
    if (showDoneTasks) {
      vTasks = [...tasks];
    } else {
      vTasks = tasks.filter((task) => task.doneAt === null);
    }

    setVisibleTasks(vTasks);
  }

  function toggleTask(taskId) {
    const itens = [...tasks];
    itens.forEach((task) => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    setTasks(itens, filterTasks());
    AsyncStorage.setItem("taskState", JSON.stringify(tasks));
  }

  function addTask(newTask) {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert("Dados Inválidos", "Descrição não informada!");
      return;
    }

    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });
    setShowAddTask(false, filterTasks());
    AsyncStorage.setItem("taskState", JSON.stringify(tasks));
  }

  function deleteTask(id) {
    const newArrTask = tasks.filter((task) => task.id !== id);
    setTasks(newArrTask, filterTasks());
    AsyncStorage.setItem("taskState", JSON.stringify(newArrTask));
  }

  useEffect(() => {
    filterTasks();
  }, [tasks, showDoneTasks]);

  useEffect(() => {
    async function getData() {
      const taskString = await AsyncStorage.getItem("taskState");
      const getTasks = JSON.parse(taskString);
      setTasks(getTasks, filterTasks());
    }
    getData();
  }, []);

  const [fonteLoaded] = useFonts({
    Lato_300Light,
    Lato_700Bold,
  });

  if (!fonteLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSave={addTask}
      />
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTasks ? "eye" : "eye-slash"}
              size={20}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Task {...item} toggleTask={toggleTask} onDelete={deleteTask} />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddTask(true)}
        activeOpacity={0.7}
      >
        <Icon name="plus" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Lato_300Light",
    color: "#FFF",
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Lato_300Light",
    color: "#FFF",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "flex-end",
    marginTop: Platform.OS === "ios" ? 40 : 30,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#B33B44",
    justifyContent: "center",
    alignItems: "center",
  },
});
