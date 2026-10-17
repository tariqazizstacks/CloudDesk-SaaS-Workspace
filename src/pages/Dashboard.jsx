import {
  FolderKanban,
  CheckSquare,
  Users,
  CircleCheck,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

import StatCard from "../components/StatCard";

const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2.5%",
    icon: FolderKanban,
    color: "purple",
  },
  {
    title: "Active Tasks",
    value: "24",
    change: "+8.2%",
    icon: CheckSquare,
    color: "blue",
  },
  {
    title: "Team Members",
    value: "8",
    change: "+1 new",
    icon: Users,
    color: "orange",
  },
  {
    title: "Completed",
    value: "86%",
    change: "+5.4%",
    icon: CircleCheck,
    color: "green",
  },
];

const projects = [
  {
    name: "Website Redesign",
    category: "Design",
    progress: 75,
    color: "purple",
    due: "Oct 22, 2026",
  },
  {
    name: "Mobile App",
    category: "Development",
    progress: 45,
    color: "blue",
    due: "Oct 25, 2026",
  },
  {
    name: "Marketing Campaign",
    category: "Marketing",
    progress: 90,
    color: "orange",
    due: "Oct 20, 2026",
  },
];

const tasks = [
  {
    title: "Finalize homepage design",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
  },
  {
    title: "Review mobile layouts",
    project: "Mobile App",
    priority: "Medium",
    status: "Pending",
  },
  {
    title: "Prepare launch checklist",
    project: "Marketing Campaign",
    priority: "Low",
    status: "Completed",
  },
];

const activities = [
  {
    name: "ZAHID ALI",
    action: "created a new project",
    target: "Website Redesign",
    time: "10 minutes ago",
  },
  {
    name: "ASHFAQ KAHN",
    action: "completed a task",
    target: "Update design system",
    time: "35 minutes ago",
  },
  {
    name: "KAHSIF",
    action: "uploaded a file",
    target: "Brand Guidelines.pdf",
    time: "1 hour ago",
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">WORKSPACE OVERVIEW</p>
          <h1>HEY WELCOME BACK,  👋TARIQ AZIZ</h1>
          <p className="page-description">
            Here is what's happening with your workspace today.
          </p>
        </div>

        <button className="primary-button">
          + New Project
        </button>
      </div>

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h2>Projects Overview</h2>
              <p>Your team's current projects</p>
            </div>

            <button className="text-button">
              View all <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <div className="project-item" key={project.name}>
                <div className="project-top">
                  <div>
                    <h3>{project.name}</h3>
                    <span>{project.category}</span>
                  </div>

                  <strong>{project.progress}%</strong>
                </div>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label={`${project.name} progress`}
                  aria-valuenow={project.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`progress-fill ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <p className="project-due">
                  <Clock3 size={14} /> Due {project.due}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest workspace updates</p>
            </div>
          </div>

          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-item" key={activity.target}>
                <div className="activity-avatar">
                  {activity.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>

                <div>
                  <p>
                    <strong>{activity.name}</strong>{" "}
                    {activity.action}{" "}
                    <strong>{activity.target}</strong>
                  </p>

                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel tasks-panel">
        <div className="panel-heading">
          <div>
            <h2>My Tasks</h2>
            <p>Tasks that need your attention</p>
          </div>

          <button className="text-button">
            View all <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-row" key={task.title}>
              <div className="task-title">
                <span className="task-checkbox">
                  {task.status === "Completed" && (
                    <CircleCheck size={18} />
                  )}
                </span>

                <div>
                  <strong>{task.title}</strong>
                  <span>{task.project}</span>
                </div>
              </div>

              <span
                className={`priority-badge ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

              <span
                className={`status-badge ${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;