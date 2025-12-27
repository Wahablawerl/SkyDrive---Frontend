import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FolderPlus,
  Upload,
  HardDrive,
  Clock,
  Star,
  Trash2,
  AlertCircle,
  X,
} from "lucide-react";

const Sidebar = ({ onUpload, onCreateFolder, storage, onClose }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isFull = storage?.percentage >= 100;

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose(); // Auto-close on mobile
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
      " " +
      ["Bytes", "KB", "MB", "GB"][i]
    );
  };

  return (
    <aside className="w-64 p-6 flex flex-col h-full bg-white border-r border-gray-100 relative shadow-2xl md:shadow-none">
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
      >
        <X size={20} />
      </button>

      <div
        className="flex items-center gap-3 mb-10 px-2 cursor-pointer"
        onClick={() => handleNav("/")}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
          S
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          SkyDrive
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files[0]) onUpload(e.target.files[0]);
          e.target.value = null;
        }}
      />

      <div className="space-y-2 mb-10">
        <button
          onClick={() => !isFull && fileInputRef.current.click()}
          disabled={isFull}
          className={`flex items-center gap-3 border transition-all px-5 py-3 rounded-2xl w-full font-semibold ${
            isFull
              ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
              : "bg-white text-gray-700 hover:border-blue-200 shadow-sm hover:shadow-md"
          }`}
        >
          <Upload
            size={20}
            className={isFull ? "text-gray-300" : "text-blue-600"}
          />
          {isFull ? "Limit Reached" : "New File"}
        </button>

        <button
          onClick={onCreateFolder}
          className="flex items-center gap-3 bg-gray-900 text-white hover:bg-gray-800 transition-all px-5 py-3 rounded-2xl w-full font-semibold shadow-md"
        >
          <FolderPlus size={20} /> New Folder
        </button>
      </div>

      <nav className="space-y-1 flex-1">
        {[
          { icon: <HardDrive size={20} />, label: "My Drive", path: "/" },
          { icon: <Clock size={20} />, label: "Recent", path: "/recent" },
          { icon: <Star size={20} />, label: "Starred", path: "/starred" },
          { icon: <Trash2 size={20} />, label: "Trash", path: "/trash" },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => handleNav(item.path)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Storage Section */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        {isFull && (
          <div className="mb-3 p-2 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 animate-pulse text-[10px] font-bold uppercase">
            <AlertCircle size={14} /> Storage Full
          </div>
        )}
        <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-2">
          <span>USAGE</span>
          <span className={isFull ? "text-red-600" : "text-gray-900"}>
            {Math.round(storage?.percentage || 0)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              isFull
                ? "bg-red-600"
                : storage?.percentage > 80
                ? "bg-orange-500"
                : "bg-blue-600"
            }`}
            style={{ width: `${Math.min(storage?.percentage || 0, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400">
          {formatBytes(storage?.used || 0)} of{" "}
          {formatBytes(storage?.limit || 104857600)}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
