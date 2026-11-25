import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useTasks } from "../src/context/TasksContext";
import type { Task } from "../src/types/task";

export default function TaskListScreen() {
  const { tasks, deleteTask } = useTasks();
  const router = useRouter();

  const renderItem = ({ item }: { item: Task }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              swipeable.close();
              deleteTask(item.id);
            }}
            style={({ pressed }) => [
              styles.deleteAction,
              pressed && styles.deleteActionPressed,
            ]}
          >
            <Text style={styles.deleteActionText}>Delete</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={() => router.push(`/tasks/${item.id}`)}
          onLongPress={() => deleteTask(item.id)}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text
              style={[
                styles.badge,
                item.completed ? styles.badgeDone : styles.badgeOpen,
              ]}
            >
              {item.completed ? "Done" : "Open"}
            </Text>
          </View>
          {item.description.length > 0 && (
            <Text style={styles.taskDescription} numberOfLines={1}>
              {item.description}
            </Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/new")}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </Pressable>

      <Text style={styles.hint}>
        Swipe left or long-press a task to delete it.
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyListContainer : styles.listContainer
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap "+ Add Task" above to create your first task.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  addButton: {
    minHeight: 44,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  addButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 24,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    minHeight: 44,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 10,
    justifyContent: "center",
  },
  cardPressed: {
    backgroundColor: "#f1f5f9",
    borderColor: "#94a3b8",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  taskDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  badge: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  badgeDone: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  badgeOpen: {
    backgroundColor: "#e0f2fe",
    color: "#075985",
  },
  deleteAction: {
    minHeight: 44,
    backgroundColor: "#dc2626",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginLeft: 8,
  },
  deleteActionPressed: {
    opacity: 0.8,
  },
  deleteActionText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  emptyBox: {
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});
