import { useState } from "react";

import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import backgroundImage from "../../assets/imgs/login.jpg";

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

export default function Auth() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [stageNew, setStageNew] = useState(false);

  function signinOrSignup() {
    if (stageNew) {
      Alert.alert("Sucesso", "Criar conta");
    } else {
      Alert.alert("Sucesso", "Locar");
    }
  }

  const [fonteLoaded] = useFonts({
    Lato_300Light,
    Lato_700Bold,
    Lato_400Regular,
  });

  if (!fonteLoaded) {
    return null;
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? "Crie a sua conta" : "Informe seus dados"}
        </Text>
        {stageNew && (
          <TextInput
            placeholder="Nome"
            value={user.name}
            style={styles.input}
            onChangeText={(name) => setUser({ ...user, name })}
          />
        )}
        <TextInput
          placeholder="E-mail"
          value={user.email}
          style={styles.input}
          onChangeText={(email) => setUser({ ...user, email })}
        />
        <TextInput
          placeholder="Senha"
          value={user.password}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(password) => setUser({ ...user, password })}
        />
        {stageNew && (
          <TextInput
            placeholder="Confirmar Senha"
            value={user.confPassword}
            style={styles.input}
            onChangeText={(confPassword) => setUser({ ...user, confPassword })}
          />
        )}
        <TouchableOpacity onPress={signinOrSignup}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {stageNew ? "Cadastrar-se" : "Entrar"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setStageNew(!stageNew)}
      >
        <Text style={styles.buttonText}>
          {stageNew ? "Já possui conta?" : "Ainda não possui conta?"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Lato_300Light",
    color: "#FFF",
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Lato_300Light",
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    width: "90%",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#FFF",
    padding: Platform.OS == "ios" ? 15 : 10,
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Lato_700Bold",
    color: "#FFF",
    fontSize: 20,
  },
});
