
import { useEffect, useState } from "react";
import { Bell, CheckCheck, Trash2, FolderKanban, Users, CheckCircle2 } from "lucide-react";

const starterNotifications = [
  { id: 1, title: "Project update", message: "Website Redesign project is ready for review.", time: "10 minutes ago", type: "project", read: false },
  { id: 2, title: "Task completed", message: "Sarah completed the Design Homepage task.", time: "1 hour ago", type: "task", read: false },
  { id: 3, title: "New team member", message: "Emily Davis was invited to Workspace HQ.", time: "Yesterday", type: "team", read: true },
];

function loadNotifications() {
  try {
    const saved = localStorage.getItem("clouddesk-notifications");
    return saved ? JSON.parse(saved) : starterNotifications;
  } catch {
    return starterNotifications;
  }
}

function Notifications() {
  const [notifications, setNotifications] = useState(loadNotifications);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("clouddesk-notifications", JSON.stringify(notifications));
  }, [notifications]);

  function markAllRead() {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function toggleRead(id) {
    setNotifications((current) =>
      current.map((item) => item.id === id ? { ...item, read: !item.read } : item)
    );
  }

  const unreadCount = notifications.filter((item) => !item.read).length;
  const visible = notifications.filter((item) => {
    if (filter === "Unread") return !item.read;
    if (filter === "Read") return item.read;
    return true;
  });

  const icons = {
    project: FolderKanban,
    task: CheckCircle2,
    team: Users,
  };

  return (
    <div className="page-section">
      <div className="page-header notification-header">
        <div>
          <h1>Notifications</h1>
          <p>You have {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}.</p>
        </div>
        <button className="primary-button" onClick={markAllRead}>
          <CheckCheck size={17} /> Mark all read
        </button>
      </div>

      <div className="notification-toolbar">
        <div className="notification-tabs">
          {["All", "Unread", "Read"].map((item) => (
            <button
              key={item}
              className={filter === item ? "notification-tab active" : "notification-tab"}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="notification-clear" onClick={() => setNotifications([])}>
          <Trash2 size={16} /> Clear all
        </button>
      </div>

      <div className="notification-list">
        {visible.map((item) => {
          const Icon = icons[item.type] || Bell;
          return (
            <div className={`notification-item ${item.read ? "is-read" : "is-unread"}`} key={item.id}>
              <div className="notification-icon"><Icon size={20} /></div>
              <div className="notification-content">
                <strong>{item.title}</strong>
                <p>{item.message}</p>
                <span>{item.time}</span>
              </div>
              <button className="notification-read-button" onClick={() => toggleRead(item.id)}>
                {item.read ? "Mark unread" : "Mark read"}
              </button>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="notification-empty">
            <Bell size={28} />
            <h3>You're all caught up</h3>
            <p>No notifications in this view.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
