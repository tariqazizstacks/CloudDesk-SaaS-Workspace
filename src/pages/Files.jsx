
import { useEffect, useState } from "react";
import { Upload, Search, FileText, Trash2, Download } from "lucide-react";

const starterFiles = [
  { id: 1, name: "Project-Requirements.pdf", type: "PDF", size: "1.2 MB" },
  { id: 2, name: "Design-Mockup.png", type: "Image", size: "850 KB" },
  { id: 3, name: "Meeting-Notes.docx", type: "Document", size: "240 KB" },
];

function loadFiles() {
  try {
    const saved = localStorage.getItem("clouddesk-files");
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error("Could not load files:", error);
  }
  return starterFiles;
}

function getFileType(file) {
  const extension = file.name.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) {
    return "Image";
  }
  if (extension === "pdf") return "PDF";
  if (["doc", "docx", "txt", "rtf"].includes(extension)) {
    return "Document";
  }
  if (["xls", "xlsx", "csv"].includes(extension)) return "Spreadsheet";
  if (["zip", "rar", "7z"].includes(extension)) return "Archive";

  return "Other";
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function Files() {
  const [files, setFiles] = useState(loadFiles);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem("clouddesk-files", JSON.stringify(files));
    } catch (error) {
      console.error("Could not save file list:", error);
    }
  }, [files]);

  function handleUpload(event) {
    const selectedFiles = Array.from(event.target.files || []);

    const newFiles = selectedFiles.map((file) => ({
      id: `${Date.now()}-${file.name}-${Math.random()}`,
      name: file.name,
      type: getFileType(file),
      size: formatSize(file.size),
      objectUrl: URL.createObjectURL(file),
    }));

    setFiles((current) => [...newFiles, ...current]);
    event.target.value = "";
  }

  function handleDelete(id) {
    setFiles((current) => {
      const fileToDelete = current.find((file) => file.id === id);

      if (fileToDelete?.objectUrl) {
        URL.revokeObjectURL(fileToDelete.objectUrl);
      }

      return current.filter((file) => file.id !== id);
    });
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === "All" || file.type === filter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="page-section">
      <div className="projects-heading">
        <div>
          <h1>Files</h1>
          <p>Manage workspace documents and shared resources.</p>
        </div>

        <label className="primary-button file-upload-button">
          <Upload size={18} />
          Upload Files
          <input
            type="file"
            multiple
            hidden
            onChange={handleUpload}
          />
        </label>
      </div>

      <div className="task-toolbar">
        <div className="project-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files..."
            aria-label="Search files"
          />
        </div>

        <select
          className="task-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter files by type"
        >
          <option value="All">All Types</option>
          <option value="PDF">PDF</option>
          <option value="Image">Images</option>
          <option value="Document">Documents</option>
          <option value="Spreadsheet">Spreadsheets</option>
          <option value="Archive">Archives</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="files-list">
        <div className="files-list-header">
          <span>Name</span>
          <span>Type</span>
          <span>Size</span>
          <span>Actions</span>
        </div>

        {filteredFiles.map((file) => (
          <div className="file-row" key={file.id}>
            <div className="file-name">
              <div className="file-icon">
                <FileText size={20} />
              </div>
              <span>{file.name}</span>
            </div>

            <span className="file-type">{file.type}</span>
            <span className="file-size">{file.size}</span>

            <div className="file-actions">
              {file.objectUrl && (
                <a
                  href={file.objectUrl}
                  download={file.name}
                  className="file-action-button"
                  aria-label={`Download ${file.name}`}
                  title="Download"
                >
                  <Download size={17} />
                </a>
              )}

              <button
                type="button"
                className="file-action-button"
                onClick={() => handleDelete(file.id)}
                aria-label={`Delete ${file.name}`}
                title="Delete"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}

        {filteredFiles.length === 0 && (
          <div className="empty-state">
            <FileText size={30} />
            <h3>No files found</h3>
            <p>Upload a file or change your search/filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Files;
