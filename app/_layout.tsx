import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TasksProvider } from "../src/context/TasksContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <TasksProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: "#111827",
            headerTitleStyle: { fontWeight: "600" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "My Tasks" }} />
          <Stack.Screen
            name="new"
            options={{
              title: "New Task",
              presentation: "modal",
            }}
          />
          <Stack.Screen name="tasks/[id]" options={{ title: "Task Details" }} />
        </Stack>
      </TasksProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
