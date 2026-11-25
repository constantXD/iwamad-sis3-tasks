import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTasks } from "../../src/context/TasksContext";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, deleteTask, toggleTask } = useTasks();
  const router = useRouter();

  const taskId = Number(id);
  const task = tasks.find((item) => item.id === taskId);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleDelete = () => {
    if (!task) return;
    deleteTask(task.id);
    handleGoBack();
  };

  if (!task) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: "Task Not Found" }} />
        <Text style={styles.notFoundTitle}>Task not found</Text>
        <Text style={styles.notFoundText}>
          No task exists with ID {id ?? "unknown"}.
        </Text>
        <Pressable
          onPress={handleGoBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>Back to My Tasks</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: task.title }} />

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{task.title}</Text>
          <View
            style={[
              styles.badge,
              task.completed ? styles.badgeDone : styles.badgeOpen,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                task.completed ? styles.badgeTextDone : styles.badgeTextOpen,
              ]}
            >
              {task.completed ? "Done" : "Open"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>
          {task.description.length > 0
            ? task.description
            : "No description provided."}
        </Text>
      </View>

      <Pressable
        onPress={() => toggleTask(task.id)}
        style={({ pressed }) => [
          styles.toggleButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.toggleButtonText}>
          {task.completed ? "Mark as Open" : "Mark as Done"}
        </Text>
      </Pressable>

      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.deleteButtonText}>Delete Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeDone: {
    backgroundColor: "#dcfce7",
  },
  badgeOpen: {
    backgroundColor: "#e0f2fe",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextDone: {
    color: "#166534",
  },
  badgeTextOpen: {
    color: "#075985",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },
  toggleButton: {
    minHeight: 44,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    minHeight: 44,
    backgroundColor: "#dc2626",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  backButton: {
    minHeight: 44,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
});
