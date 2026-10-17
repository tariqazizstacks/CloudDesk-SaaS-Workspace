
import { useEffect, useState } from "react";
import { UserRound, Building2, SlidersHorizontal, Save, Check } from "lucide-react";

const defaultSettings = {
  fullName: "Alex Morgan",
  email: "alex@clouddesk.com",
  jobTitle: "Workspace Administrator",
  workspaceName: "Workspace HQ",
  workspaceDescription: "Our team's central collaboration workspace.",
  timezone: "Asia/Karachi",
  emailNotifications: true,
  taskUpdates: true,
  weeklySummary: false,
};

function loadSettings() {
  try {
    const saved = localStorage.getItem("clouddesk-settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function Settings() {
  const [settings, setSettings] = useState(loadSettings);
  const [tab, setTab] = useState("Workspace");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("clouddesk-settings", JSON.stringify(settings));
  }, [settings]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSavedMessage("");
  }

  function handleSave(event) {
    event.preventDefault();
    localStorage.setItem("clouddesk-settings", JSON.stringify(settings));
    setSavedMessage("Your settings have been saved.");
  }

  return (
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile, workspace, and preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-nav">
          {[
            { name: "Workspace", icon: Building2 },
            { name: "Profile", icon: UserRound },
            { name: "Preferences", icon: SlidersHorizontal },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={tab === name ? "settings-nav-button active" : "settings-nav-button"}
              onClick={() => setTab(name)}
            >
              <Icon size={18} /> {name}
            </button>
          ))}
        </aside>

        <form className="settings-panel" onSubmit={handleSave}>
          {tab === "Workspace" && (
            <>
              <h2>Workspace management</h2>
              <p className="settings-description">Update your shared workspace information.</p>
              <label className="settings-field">
                Workspace name
                <input name="workspaceName" value={settings.workspaceName} onChange={updateField} required />
              </label>
              <label className="settings-field">
                Workspace description
                <textarea name="workspaceDescription" value={settings.workspaceDescription} onChange={updateField} rows={4} />
              </label>
              <div className="settings-readonly">
                <span>Workspace plan</span>
                <strong>Free Demo Plan</strong>
              </div>
              <p className="settings-description">Workspace details are saved in this browser for the prototype.</p>
            </>
          )}

          {tab === "Profile" && (
            <>
              <h2>Profile information</h2>
              <p className="settings-description">Update the profile details shown in your workspace.</p>
              <label className="settings-field">
                Full name
                <input name="fullName" value={settings.fullName} onChange={updateField} required />
              </label>
              <label className="settings-field">
                Email address
                <input name="email" type="email" value={settings.email} onChange={updateField} required />
              </label>
              <label className="settings-field">
                Job title
                <input name="jobTitle" value={settings.jobTitle} onChange={updateField} />
              </label>
            </>
          )}

          {tab === "Preferences" && (
            <>
              <h2>Preferences</h2>
              <p className="settings-description">Choose how you want to use CloudDesk.</p>
              <label className="settings-field">
                Time zone
                <select name="timezone" value={settings.timezone} onChange={updateField}>
                  <option value="Asia/Karachi">Pakistan (Asia/Karachi)</option>
                  <option value="UTC">UTC</option>
                  <option value="Europe/London">London</option>
                  <option value="America/New_York">New York</option>
                </select>
              </label>
              <div className="settings-toggle-row">
                <div><strong>Email notifications</strong><p>Receive updates about workspace activity.</p></div>
                <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={updateField} />
              </div>
              <div className="settings-toggle-row">
                <div><strong>Task updates</strong><p>Keep informed about task changes.</p></div>
                <input type="checkbox" name="taskUpdates" checked={settings.taskUpdates} onChange={updateField} />
              </div>
              <div className="settings-toggle-row">
                <div><strong>Weekly summary</strong><p>Show the weekly workspace summary preference.</p></div>
                <input type="checkbox" name="weeklySummary" checked={settings.weeklySummary} onChange={updateField} />
              </div>
            </>
          )}

          <div className="settings-save-row">
            {savedMessage && <span className="settings-saved"><Check size={16} /> {savedMessage}</span>}
            <button className="primary-button" type="submit"><Save size={17} /> Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
