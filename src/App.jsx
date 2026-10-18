import { useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import Column from "./components/Column.jsx";
import TaskForm from "./components/TaskForm.jsx";
import "./App.css";

const SEED_TASKS = [
  { id: crypto.randomUUID(), title: "Set up project structure", notes: "Vite + React", priority: "low", status: "done" },
  { id: crypto.randomUUID(), title: "Design task board layout", notes: "Three columns, card UI", priority: "medium", status: "doing" },
  { id: crypto.randomUUID(), title: "Add search and filtering", notes: "", priority: "high", status: "todo" },
];

const COLUMNS = [
  { status: "todo", title: "To Do" },
  { status: "doing", title: "In Progress" },
  { status: "done", title: "Done" },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("task-board-tasks", SEED_TASKS);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase());
      const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
      return matchesQuery && matchesPriority;
    });
  }, [tasks, query, priorityFilter]);

  function handleSave(taskData) {
    if (taskData.id) {
      setTasks((prev) => prev.map((t) => (t.id === taskData.id ? taskData : t)));
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, { ...taskData, id: crypto.randomUUID() }]);
    }
  }

  function handleMove(id, status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>
        <p className="subtitle">A small React + AI-assisted build for FlyRank Week 3</p>
      </header>

      <TaskForm editingTask={editingTask} onSave={handleSave} onCancel={() => setEditingTask(null)} />

      <div className="toolbar">
        <input
          className="search"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={filteredTasks.filter((t) => t.status === col.status)}
            onMove={handleMove}
            onDelete={handleDelete}
            onEdit={setEditingTask}
          />
        ))}
      </div>
    </div>
  );
}
