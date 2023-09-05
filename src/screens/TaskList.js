import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { useFonts, Lato_300Light, Lato_700Bold } from "@expo-google-fonts/lato";
import todayImage from "../../assets/imgs/today.jpg";

import moment from "moment/moment";
import "moment/locale/pt-br";
import Task from "../components/Task";

export default function TaskList() {
  const [fonteLoaded] = useFonts({
    Lato_300Light,
    Lato_700Bold,
  });

  if (!fonteLoaded) {
    return null;
  }

  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");

  return (
    <View style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <Task
          desc="Comprar Livro"
          estimateAt={new Date()}
          doneAt={new Date()}
        />
        <Task desc="Ler Livro" estimateAt={new Date()} doneAt={new Date()} />
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
});