import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Edit } from "lucide-react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (task.trim() === "") return;
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" />
        <Button onClick={addTask}>{editingIndex !== null ? "Update" : "Add"}</Button>
      </div>
      <div className="space-y-2">
        {tasks.map((t, index) => (
          <Card key={index} className="flex justify-between p-2">
            <CardContent>{t}</CardContent>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => editTask(index)}>
                <Edit size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => deleteTask(index)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}