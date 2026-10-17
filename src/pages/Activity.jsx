
import { useState } from "react";
import { Activity as ActivityIcon, Search, FolderKanban, CheckCircle2, Users, FileText } from "lucide-react";

const activityItems = [
  { id: 1, user: "ZAHID", action: "created a new project", target: "Website Redesign", type: "project", time: "Today, 10:30 AM" },
  { id: 2, user: "ASHFAQ", action: "completed a task", target: "Design homepage", type: "task", time: "Today, 9:45 AM" },
  { id: 3, user: "David  MILLER", action: "uploaded a file", target: "Project Brief.pdf", type: "file", time: "Today, 9:15 AM" },
  { id: 4, user: "KASHIF", action: "joined the workspace", target: "Workspace HQ", type: "team", time: "Yesterday, 4:20 PM" },
  { id: 5, user: " Morgan", action: "created a task", target: "Review project requirements", type: "task", time: "Yesterday, 2:10 PM" },
  { id: 6, user: "Sarah  ", action: "updated a project", target: "Mobile App", type: "project", time: "Yesterday, 11:00 AM" },
];

const activityIcons = {
  project: FolderKanban,
  task: CheckCircle2,
  file: FileText,
  team: Users,
};

function Activity() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = activityItems.filter((item) => {
    const matchesSearch = `${item.user} ${item.action} ${item.target}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.type === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1>Activity Feed</h1>
          <p>See what's happening across your workspace.</p>
        </div>
      </div>

      <div className="activity-toolbar">
        <div className="team-search">
          <Search size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activity..." />
        </div>
        <select className="activity-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Project</option>
          <option>Task</option>
          <option>File</option>
          <option>Team</option>
        </select>
      </div>

      <div className="activity-list">
        {filtered.map((item) => {
          const Icon = activityIcons[item.type] || ActivityIcon;
          return (
            <div className="activity-item" key={item.id}>
              <div className="activity-icon"><Icon size={19} /></div>
              <div className="activity-description">
                <p><strong>{item.user}</strong> {item.action} <strong>{item.target}</strong></p>
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="activity-empty">No activity matches your search.</p>}
      </div>
      <p className="activity-note">Sample activity for demonstration; new actions are not yet automatically recorded here.</p>
    </div>
  );
}

export default Activity;
