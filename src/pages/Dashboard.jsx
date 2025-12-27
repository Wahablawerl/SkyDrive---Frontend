import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FolderCard from "../components/FolderCard";
import FileCard from "../components/FileCard";
import ImagePreviewModal from "../components/ImagePreviewModal";
import { ChevronRight, Upload } from "lucide-react";

const Dashboard = ({ view }) => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const [items, setItems] = useState({ folders: [], files: [] });
  const [isDragging, setIsDragging] = useState(false);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [storage, setStorage] = useState({
    used: 0,
    limit: 104857600,
    percentage: 0,
  });

  const fetchStorage = async () => {
    try {
      const res = await API.get("/files/storage-stats");
      setStorage(res.data);
    } catch (err) {
      console.error("Error fetching storage stats:", err);
    }
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      let url =
        view === "starred"
          ? "/files/starred"
          : view === "recent"
          ? "/files/recent"
          : view === "trash"
          ? "/files/trash"
          : folderId
          ? `/folders/${folderId}`
          : "/folders/root";

      const res = await API.get(url);
      setItems(res.data);

      if (folderId && (view === "folder" || !view)) {
        const pathRes = await API.get(`/folders/${folderId}/path`);
        setPath(pathRes.data);
      } else {
        setPath([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Single Source of Truth for Data Fetching
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchContent();
    fetchStorage();
    setIsSidebarOpen(false); // Auto-close sidebar on mobile after navigation
  }, [folderId, view]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedFile(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleUpload = async (file) => {
    if (storage.used + file.size > storage.limit) {
      alert("Storage limit reached!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    if (folderId) formData.append("folder_id", folderId);

    try {
      const res = await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setItems((prev) => ({ ...prev, files: [res.data, ...prev.files] }));
      fetchStorage();
    } catch (err) {
      alert("Upload failed.");
    }
  };

  const handleCreateFolder = async () => {
    const name = prompt("Folder Name:");
    if (!name) return;
    try {
      const res = await API.post("/folders/create", {
        name,
        parent_id: folderId || null,
      });
      setItems((prev) => ({ ...prev, folders: [res.data, ...prev.folders] }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStar = async (e, id, type) => {
    e.stopPropagation();
    try {
      if (type === "file") {
        await API.patch(`/files/${id}/star`);
      } else {
        await API.patch(`/folders/${id}/star`);
      }
      fetchContent(); // Refetch to update the UI
    } catch (err) {
      console.error("Toggle star failed:", err);
    }
  };

  const handleDelete = async (e, id, type) => {
    e.stopPropagation();
    try {
      if (view === "trash") {
        // Permanent delete
        if (type === "file") {
          await API.delete(`/files/${id}`);
        } else {
          await API.delete(`/folders/${id}`);
        }
      } else {
        // Move to trash
        if (type === "file") {
          await API.patch(`/files/${id}/trash`);
        } else {
          await API.patch(`/folders/${id}/trash`);
        }
      }
      fetchContent(); // Refetch to update the UI
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleRestore = async (e, id, type) => {
    e.stopPropagation();
    try {
      if (type === "file") {
        await API.patch(`/files/${id}/restore`);
      } else {
        await API.patch(`/folders/${id}/restore`);
      }
      fetchContent(); // Refetch to update the UI
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  // Render Logic
  const displayFolders = items.folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayFiles = items.files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] md:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Section */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-64 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          onUpload={handleUpload}
          onCreateFolder={handleCreateFolder}
          storage={storage}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Area */}
      <main
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleUpload(e.dataTransfer.files[0]);
        }}
        className="flex-1 flex flex-col bg-white m-0 md:m-2 rounded-none md:rounded-3xl shadow-sm relative overflow-hidden"
      >
        {isDragging && (
          <div className="absolute inset-0 z-[150] bg-blue-600/10 backdrop-blur-[2px] border-4 border-dashed border-blue-500 m-4 rounded-3xl flex items-center justify-center pointer-events-none">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-2">
              <Upload className="text-blue-600" size={32} />
              <p className="font-bold">Drop to Upload</p>
            </div>
          </div>
        )}

        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 md:p-6">
          <Navbar
            user={user}
            logout={logout}
            onSearch={setSearchQuery}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 pt-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 mb-6 text-xs md:text-sm text-gray-400">
            <span
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              My Drive
            </span>
            {path.map((p) => (
              <span key={p.id} className="flex items-center gap-1">
                <ChevronRight size={14} />
                <span
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/folder/${p.id}`)}
                >
                  {p.name}
                </span>
              </span>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-400">Loading files...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayFolders.map((f) => (
                <FolderCard
                  key={f.id}
                  folder={f}
                  view={view}
                  onNavigate={(id) => navigate(`/folder/${id}`)}
                  onToggleStar={handleToggleStar}
                  onDelete={handleDelete}
                  onRestore={handleRestore}
                />
              ))}
              {displayFiles.map((f) => (
                <FileCard
                  key={f.id}
                  file={f}
                  view={view}
                  onPreview={setSelectedFile}
                  onToggleStar={handleToggleStar}
                  onDelete={handleDelete}
                  onRestore={handleRestore}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedFile && (
        <ImagePreviewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
