import { ImageBackground, Text, StyleSheet } from "react-native";
import backgroundImage from "../../assets/imgs/login.jpg";

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

export default function Auth() {
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
});
