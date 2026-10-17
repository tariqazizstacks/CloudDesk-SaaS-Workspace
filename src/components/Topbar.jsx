import { Search, Bell, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search anything..."
          aria-label="Search workspace"
        />
      </div>

      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="profile-menu">
          <div className="user-avatar">AM</div>

          <div className="profile-info">
            <strong>TARIQ AZIZ</strong>
            <span>Admin</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;