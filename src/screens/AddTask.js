import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";

import { useState } from "react";

import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

export default function AddTask(props) {
  const iniState = { desc: "" };
  const [initialState, setInitialState] = useState({ ...iniState });
  const [fonteLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fonteLoaded) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a descrição"
          value={initialState.desc}
          onChangeText={(desc) => setInitialState({ desc })}
        />
        <View style={styles.btns}>
          <TouchableOpacity onPress={props.onCancel}>
            <Text style={styles.btn}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btn}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  container: {
    backgroundColor: "#FFF",
  },
  header: {
    fontFamily: "Lato_400Regular",
    backgroundColor: "#B13B44",
    color: "#FFF",
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    margin: 20,
    marginRight: 30,
    color: "#B13B44",
  },
  input: {
    fontFamily: "Lato_400Regular",
    height: 40,
    margin: 15,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 6,
  },
});
