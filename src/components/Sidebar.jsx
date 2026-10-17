
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Files,
  Users,
  Activity,
  Bell,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Files", path: "/files", icon: Files },
  { name: "Team", path: "/team", icon: Users },
  { name: "Activity", path: "/activity", icon: Activity },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">C</div>
        <span>CloudDesk</span>
      </div>

      <div className="workspace-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">AM</div>
        <div>
          <strong>TARIQ AZIZ</strong>
          <p>Workspace Admin</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
