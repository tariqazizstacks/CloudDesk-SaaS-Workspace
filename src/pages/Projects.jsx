 
import { useState } from "react";
import { Plus, Search, FolderKanban } from "lucide-react";

function Projects() {
  const [search, setSearch] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website.",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App",
      description: "Develop the mobile application.",
      status: "Planning",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Prepare the upcoming campaign.",
      status: "Completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleAddProject(event) {
    event.preventDefault();

    if (!name.trim()) return;

    const newProject = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim() || "No description added.",
      status: "Planning",
    };

    setProjects((currentProjects) => [
      newProject,
      ...currentProjects,
    ]);

    setName("");
    setDescription("");
    setShowForm(false);
    setSearch("");
  }

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.description} ${project.status}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div className="page-section">
      <div className="projects-heading">
        <div>
          <h1>Projects</h1>
          <p>Manage and track all your workspace projects.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setShowForm((previous) => !previous)}
        >
          <Plus size={18} />
          {showForm ? "Close Form" : "New Project"}
        </button>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleAddProject}>
          <h2>Create a project</h2>

          <label htmlFor="project-name">Project name</label>
          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Client Dashboard"
            required
          />

          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What is this project about?"
            rows={3}
          />

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setShowForm(false);
                setName("");
                setDescription("");
              }}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              <Plus size={17} />
              Create Project
            </button>
          </div>
        </form>
      )}

      <div className="project-search">
        <Search size={18} />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects"
        />

        {search && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}
      </div>

      <p className="project-results">
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-card-icon">
              <FolderKanban size={23} />
            </div>

            <span
              className={`project-status ${project.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {project.status}
            </span>

            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <FolderKanban size={30} />
          <h3>No projects found</h3>
          <p>
            {search
              ? "Try another search keyword."
              : "Create your first project to get started."}
          </p>

          {search && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;
