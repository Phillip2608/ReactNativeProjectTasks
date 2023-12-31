import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/Navigator";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
