
import { useEffect, useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  Trash2,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";

const starterMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@clouddesk.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@clouddesk.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david@clouddesk.com",
    role: "Member",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@clouddesk.com",
    role: "Member",
    status: "Invited",
  },
];

function loadMembers() {
  try {
    const saved = localStorage.getItem("clouddesk-members");
    return saved ? JSON.parse(saved) : starterMembers;
  } catch {
    return starterMembers;
  }
}

function Team() {
  const [members, setMembers] = useState(loadMembers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("clouddesk-members", JSON.stringify(members));
  }, [members]);

  function addMember(event) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) return;

    if (members.some((member) => member.email.toLowerCase() === cleanEmail)) {
      setMessage("This email is already in the team.");
      return;
    }

    setMembers((current) => [
      ...current,
      {
        id: Date.now(),
        name: cleanName,
        email: cleanEmail,
        role,
        status: "Invited",
      },
    ]);

    setName("");
    setEmail("");
    setRole("Member");
    setMessage("Team member added successfully.");
    setShowForm(false);
  }

  function updateRole(id, newRole) {
    setMembers((current) =>
      current.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
    setMessage("Member role updated.");
  }

  function deleteMember(id) {
    const member = members.find((item) => item.id === id);
    if (!member) return;

    if (member.role === "Admin" && members.filter((m) => m.role === "Admin").length === 1) {
      setMessage("The last Admin cannot be removed.");
      return;
    }

    setMembers((current) => current.filter((member) => member.id !== id));
    setMessage("Team member removed.");
  }

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.email} ${member.role} ${member.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const admins = members.filter((member) => member.role === "Admin").length;
  const activeMembers = members.filter((member) => member.status === "Active").length;

  return (
    <div className="page-section">
      <div className="page-header team-page-header">
        <div>
          <h1>Team Members</h1>
          <p>Manage your workspace team, invitations, and access roles.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setMessage("");
            setShowForm((current) => !current);
          }}
        >
          {showForm ? <X size={18} /> : <UserPlus size={18} />}
          {showForm ? "Cancel" : "Add Member"}
        </button>
      </div>

      {message && (
        <div className="team-message" role="status">
          {message}
          <button onClick={() => setMessage("")} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}

      {showForm && (
        <form className="team-form" onSubmit={addMember}>
          <h2>Add a team member</h2>
          <div className="team-form-grid">
            <label>
              Full name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Ayesha Khan"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>

            <label>
              Workspace role
              <select value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Member">Member</option>
                <option value="Viewer">Viewer</option>
              </select>
            </label>
          </div>

          <p className="team-form-note">
            Demo mode: adding a member does not send a real email invitation.
          </p>

          <button className="primary-button" type="submit">
            <UserPlus size={17} /> Add to team
          </button>
        </form>
      )}

      <div className="team-stats">
        <div className="team-stat-card">
          <span className="team-stat-icon"><Users size={20} /></span>
          <div><p>Total members</p><h2>{members.length}</h2></div>
        </div>
        <div className="team-stat-card">
          <span className="team-stat-icon"><ShieldCheck size={20} /></span>
          <div><p>Workspace admins</p><h2>{admins}</h2></div>
        </div>
        <div className="team-stat-card">
          <span className="team-stat-icon"><Mail size={20} /></span>
          <div><p>Active members</p><h2>{activeMembers}</h2></div>
        </div>
      </div>

      <div className="team-toolbar">
        <div className="team-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or role..."
            aria-label="Search team members"
          />
        </div>
        <span className="team-count">{filteredMembers.length} members</span>
      </div>

      <div className="team-table-wrap">
        <table className="team-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="team-member-cell">
                    <div className="team-avatar">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="team-member-details">
                      <strong>{member.name}</strong>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <select
                    className="team-role-select"
                    value={member.role}
                    onChange={(event) => updateRole(member.id, event.target.value)}
                    aria-label={`Role for ${member.name}`}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Member">Member</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </td>
                <td>
                  <span className={`team-status ${member.status.toLowerCase()}`}>
                    {member.status}
                  </span>
                </td>
                <td>
                  <button
                    className="team-delete-button"
                    onClick={() => deleteMember(member.id)}
                    title={`Remove ${member.name}`}
                    aria-label={`Remove ${member.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan="4" className="team-empty">
                  No team members found. Try a different search or add a member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="team-roles-info">
        <h2>Workspace roles</h2>
        <div className="team-role-cards">
          <div><strong>Admin</strong><p>Full workspace access and member management.</p></div>
          <div><strong>Manager</strong><p>Manage projects, tasks, and team work.</p></div>
          <div><strong>Member</strong><p>Collaborate on assigned workspace work.</p></div>
          <div><strong>Viewer</strong><p>View workspace information with limited access.</p></div>
        </div>
      </div>
    </div>
  );
}

export default Team;
