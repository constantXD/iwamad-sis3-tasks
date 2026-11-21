import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task } from "../types/task";

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Finish SIS 3 mobile app",
    description:
      "Build all screens, add gestures and animations, then publish to GitHub Pages.",
    completed: false,
  },
  {
    id: 2,
    title: "Review Expo Router navigation",
    description:
      "Check Stack headers, dynamic task routes, and the custom 404 screen.",
    completed: true,
  },
  {
    id: 3,
    title: "Test on iPhone in Expo Go",
    description:
      "Verify swipe gesture, keyboard input handling, and take a screenshot.",
    completed: false,
  },
];

interface TasksContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (title: string, description: string) => {
    setTasks((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      const newTask: Task = {
        id: nextId,
        title: title.trim(),
        description: description.trim(),
        completed: false,
      };
      return [newTask, ...prev];
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextType {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
