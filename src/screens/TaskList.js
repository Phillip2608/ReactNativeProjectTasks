import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useFonts, Lato_300Light, Lato_700Bold } from "@expo-google-fonts/lato";
import todayImage from "../../assets/imgs/today.jpg";
import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
import "moment/locale/pt-br";
import Task from "../components/Task";

export default function TaskList() {
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      desc: "Comprar livro de React Native",
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: Math.random(),
      desc: "Ler livro de React Native",
      estimateAt: new Date(),
      doneAt: null,
    },
  ]);

  const [fonteLoaded] = useFonts({
    Lato_300Light,
    Lato_700Bold,
  });

  if (!fonteLoaded) {
    return null;
  }

  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");

  function toggleFilter() {
    setShowDoneTasks(!showDoneTasks);
  }

  function toggleTask(taskId) {
    const itens = [...tasks];
    itens.forEach((task) => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    setTasks(itens);
  }

  return (
    <View style={styles.container}>
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
          data={tasks}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} />}
        />
      </View>
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
});
