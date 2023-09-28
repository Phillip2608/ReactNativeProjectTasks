import { createDrawerNavigator } from "@react-navigation/drawer";
import TaskList from "../screens/TaskList";
const Drawer = createDrawerNavigator();
export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { fontSize: 20, fontWeight: "normal" },
        drawerActiveTintColor: "#080",
      }}
    >
      <Drawer.Screen name="Today" options={{ title: "Hoje" }}>
        {(props) => <TaskList title="Hoje" daysAhead={0} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Tomorrow" options={{ title: "Amanhã" }}>
        {(props) => <TaskList title="Amanhã" daysAhead={1} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Week" options={{ title: "Semana" }}>
        {(props) => <TaskList title="Semana" daysAhead={7} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Month" options={{ title: "Mês" }}>
        {(props) => <TaskList title="Mês" daysAhead={30} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
