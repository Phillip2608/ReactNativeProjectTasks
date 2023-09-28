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
import axios from "axios";
import { server, showError } from "../common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Lato_300Light, Lato_700Bold } from "@expo-google-fonts/lato";
import todayImage from "../../assets/imgs/today.jpg";
import tomorrowImage from "../../assets/imgs/tomorrow.jpg";
import weekImage from "../../assets/imgs/week.jpg";
import monthImage from "../../assets/imgs/month.jpg";
import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
import "moment/locale/pt-br";
import Task from "../components/Task";
import AddTask from "./AddTask";

export default function TaskList(props) {
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState([]);

  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");

  async function loadTasks() {
    try {
      const maxDate = moment()
        .add({ days: props.daysAhead })
        .format("YYYY-MM-DD 23:59:59");
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      setTasks(res.data, filterTasks());
    } catch (e) {
      showError(e);
    }
  }

  function toggleFilter() {
    setShowDoneTasks(!showDoneTasks, filterTasks());
  }

  function filterTasks() {
    let vTasks = null;
    if (showDoneTasks) {
      if (tasks) {
        vTasks = [...tasks];
      }
    } else {
      if (tasks) {
        vTasks = tasks.filter((task) => task.doneAt === null);
      }
    }

    setVisibleTasks(vTasks);
  }

  async function toggleTask(taskId) {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  }

  async function addTask(newTask) {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert("Dados Inválidos", "Descrição não informada!");
      return;
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      });
      setShowAddTask(false, loadTasks());
    } catch (e) {
      showError(e);
    }
  }

  async function deleteTask(taskId) {
    try {
      await axios.delete(`${server}/tasks/${taskId}`);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  }

  function getImage() {
    switch (props.daysAhead) {
      case 0:
        return todayImage;
      case 1:
        return tomorrowImage;
      case 7:
        return weekImage;
      default:
        return monthImage;
    }
  }

  function getColor() {
    switch (props.daysAhead) {
      case 0:
        return "#B13B44";
      case 1:
        return "#C9742E";
      case 7:
        return "#15721E";
      default:
        return "#1631BE";
    }
  }

  useEffect(() => {
    filterTasks();
  }, [tasks, showDoneTasks]);

  useEffect(() => {
    async function showData() {
      const showString = await AsyncStorage.getItem("showTasks");
      const showTasks = JSON.parse(showString);
      setShowDoneTasks(showTasks, filterTasks());
    }
    showData();
    loadTasks();
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
      <ImageBackground source={getImage()} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Icon name="bars" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTasks ? "eye" : "eye-slash"}
              size={20}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{props.title}</Text>
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
        style={[styles.addButton, { backgroundColor: getColor() }]}
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
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 40 : 30,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
