
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Files from "./pages/Files";
import Team from "./pages/Team";
import Activity from "./pages/Activity";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import "./index.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-area">
        <Topbar />

        <section className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/files" element={<Files />} />
            <Route path="/team" element={<Team />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
