import { Folder, Star, Trash2, RefreshCw, DownloadCloud } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

const FolderCard = ({
  folder,
  view,
  onNavigate,
  onToggleStar,
  onDelete,
  onRestore,
}) => {
  const handleDownloadZip = async (e) => {
    e.stopPropagation();
    try {
      const response = await API.get(`/folders/${folder.id}/download`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${folder.name}.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Download failed");
    }
  };

  return (
    <div className="group p-3 md:p-4 border border-gray-100 rounded-xl md:rounded-2xl hover:shadow-md transition-all bg-white relative">
      {/* Star Action */}
      {view !== "trash" && (
        <button
          onClick={(e) => onToggleStar(e, folder.id, "folder")}
          className="absolute top-2 left-2 z-10"
        >
          <Star
            size={16}
            className={`${
              folder.is_starred
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            }`}
          />
        </button>
      )}

      {/* Main Content Area */}
      <div
        onClick={() => onNavigate(folder.id)}
        className="flex flex-col items-center text-center gap-2 md:gap-3 cursor-pointer"
      >
        <div className="w-full h-24 md:h-32 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center border border-gray-50">
          <Folder className="text-blue-500 fill-blue-500/10" size={48} />
        </div>
        <span className="text-xs md:text-sm font-medium text-gray-700 truncate w-full px-1">
          {folder.name}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-1 z-20">
        {view === "trash" ? (
          <>
            <button
              onClick={(e) => onRestore(e, folder.id, "folder")}
              className="p-1.5 bg-white shadow-sm text-green-500 rounded-full hover:bg-green-50 transition-all"
              title="Restore Folder"
            >
              <RefreshCw size={14} />
            </button>
            <button
              onClick={(e) => onDelete(e, folder.id, "folder")}
              className="p-1.5 bg-white shadow-sm text-red-500 rounded-full hover:bg-red-50 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleDownloadZip}
              className="p-1.5 bg-white shadow-sm text-blue-500 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-blue-50 transition-all"
              title="Download as Zip"
            >
              <DownloadCloud size={14} />
            </button>
            <button
              onClick={(e) => onDelete(e, folder.id, "folder")}
              className="p-1.5 bg-white shadow-sm text-gray-400 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FolderCard;
