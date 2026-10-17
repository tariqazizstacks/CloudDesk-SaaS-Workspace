
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  CheckSquare,
  Trash2,
  Circle,
  CheckCircle2,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Finalize homepage design",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Review mobile app screens",
    project: "Mobile App",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Prepare marketing content",
    project: "Marketing Campaign",
    priority: "Low",
    status: "Completed",
  },
];

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem("clouddesk-tasks");

    if (savedTasks !== null) {
      const parsedTasks = JSON.parse(savedTasks);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      }
    }
  } catch (error) {
    console.error("Could not load saved tasks:", error);
  }

  return initialTasks;
}

function Tasks() {
  const [tasks, setTasks] = useState(loadTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    try {
      localStorage.setItem("clouddesk-tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [tasks]);

  function handleAddTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      project: project.trim() || "General",
      priority,
      status: "Pending",
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    setTitle("");
    setProject("");
    setPriority("Medium");
    setShowForm(false);
    setSearch("");
    setFilter("All");
  }

  function toggleTaskStatus(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      `${task.title} ${task.project} ${task.priority} ${task.status}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingCount = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <div className="page-section">
      <div className="projects-heading">
        <div>
          <h1>Tasks</h1>
          <p>Organize work and keep your projects moving forward.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setShowForm((previous) => !previous)}
        >
          <Plus size={18} />
          {showForm ? "Close Form" : "New Task"}
        </button>
      </div>

      <div className="task-stats">
        <div className="task-stat-card">
          <span>Total Tasks</span>
          <h2>{tasks.length}</h2>
        </div>

        <div className="task-stat-card">
          <span>To Do</span>
          <h2>{pendingCount}</h2>
        </div>

        <div className="task-stat-card">
          <span>Completed</span>
          <h2>{completedCount}</h2>
        </div>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleAddTask}>
          <h2>Create a task</h2>

          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Design login page"
            required
          />

          <label htmlFor="task-project">Project name</label>
          <input
            id="task-project"
            value={project}
            onChange={(event) => setProject(event.target.value)}
            placeholder="e.g. Website Redesign"
          />

          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              <Plus size={17} />
              Add Task
            </button>
          </div>
        </form>
      )}

      <div className="task-toolbar">
        <div className="project-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
          />
        </div>

        <select
          className="task-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter tasks by status"
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <article className="task-row" key={task.id}>
            <button
              type="button"
              className="task-check"
              onClick={() => toggleTaskStatus(task.id)}
              title={
                task.status === "Completed"
                  ? "Mark as pending"
                  : "Mark as completed"
              }
              aria-label={`Change status of ${task.title}`}
            >
              {task.status === "Completed" ? (
                <CheckCircle2 size={22} />
              ) : (
                <Circle size={22} />
              )}
            </button>

            <div className="task-details">
              <h3
                className={
                  task.status === "Completed" ? "task-done" : ""
                }
              >
                {task.title}
              </h3>
              <p>{task.project}</p>
            </div>

            <span
              className={`task-priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>

            <span
              className={`task-status ${task.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {task.status}
            </span>

            <button
              type="button"
              className="task-delete"
              onClick={() => deleteTask(task.id)}
              title="Delete task"
              aria-label={`Delete ${task.title}`}
            >
              <Trash2 size={18} />
            </button>
          </article>
        ))}

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <CheckSquare size={30} />
            <h3>No tasks found</h3>
            <p>Try a different search or add a new task.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
