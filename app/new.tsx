import { useRef, useState, type ComponentRef } from "react";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTasks } from "../src/context/TasksContext";

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const descriptionRef = useRef<ComponentRef<typeof TextInput>>(null);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (error && text.trim().length > 0) {
      setError("");
    }
  };

  const handleSave = () => {
    if (title.trim().length === 0) {
      setError("Task title cannot be empty");
      return;
    }

    addTask(title, description);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={handleTitleChange}
            placeholder="e.g. Submit SIS 3 on Teams"
            placeholderTextColor="#9ca3af"
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            style={[styles.input, error ? styles.inputError : undefined]}
          />
          {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            ref={descriptionRef}
            value={description}
            onChangeText={setDescription}
            placeholder="Add extra details..."
            placeholderTextColor="#9ca3af"
            returnKeyType="done"
            onSubmitEditing={handleSave}
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
        >
          <Text style={styles.saveButtonText}>Save Task</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    minHeight: 44,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
  },
  inputError: {
    borderColor: "#dc2626",
    borderWidth: 2,
  },
  errorText: {
    fontSize: 13,
    color: "#dc2626",
  },
  saveButton: {
    minHeight: 44,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  saveButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
