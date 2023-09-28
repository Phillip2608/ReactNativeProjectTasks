import { useState } from "react";

import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import backgroundImage from "../../assets/imgs/login.jpg";

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import axios from "axios";

import AuthInput from "../components/AuthInput";
import { server, showError, showSuccess } from "../common";
import { useEffect } from "react";

const initialState = {
  name: "",
  email: "luizlindo2416@gmail.com",
  password: "A21w05c7",
  confPassword: "",
};

export default function Auth(props) {
  const [user, setUser] = useState(initialState);
  const [stageNew, setStageNew] = useState(false);
  const [validForm, setValidForm] = useState(false);

  function signinOrSignup() {
    if (stageNew) {
      signup();
    } else {
      signin();
    }
  }

  async function signup() {
    try {
      await axios.post(`${server}/signup`, {
        name: user.name,
        email: user.email,
        password: user.password,
        confPassword: user.confPassword,
      });

      showSuccess("Usuário cadastrado!");
      setStageNew(false);
      setUser(initialState);
    } catch (e) {
      showError(e);
    }
  }

  async function signin() {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: user.email,
        password: user.password,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${res.data.token}`;
      props.navigation.navigate("Home");
    } catch (e) {
      showError(e);
    }
  }

  useEffect(() => {
    const validations = [];
    validations.push(user.email && user.email.includes("@"));
    validations.push(user.password && user.password.length >= 8);

    if (stageNew) {
      validations.push(user.name && user.name.trim().length >= 3);
      validations.push(user.password === user.confPassword);
    }

    setValidForm(validations.reduce((t, a) => t && a));
  }, [user]);

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
          <AuthInput
            icon="user"
            placeholder="Nome"
            value={user.name}
            style={styles.input}
            onChangeText={(name) => setUser({ ...user, name })}
          />
        )}
        <AuthInput
          icon="at"
          placeholder="E-mail"
          value={user.email}
          style={styles.input}
          onChangeText={(email) => setUser({ ...user, email })}
        />
        <AuthInput
          icon="lock"
          placeholder="Senha"
          value={user.password}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(password) => setUser({ ...user, password })}
        />
        {stageNew && (
          <AuthInput
            icon="asterisk"
            placeholder="Confirmar Senha"
            value={user.confPassword}
            style={styles.input}
            onChangeText={(confPassword) => setUser({ ...user, confPassword })}
          />
        )}
        <TouchableOpacity onPress={signinOrSignup} disabled={!validForm}>
          <View
            style={[
              styles.button,
              validForm ? {} : { backgroundColor: "#AAA" },
            ]}
          >
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
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: "Lato_700Bold",
    color: "#FFF",
    fontSize: 20,
  },
});
