import { useState } from "react";
import { FileText, Star, Trash2, RefreshCw, Share2, Check } from "lucide-react";

const FileCard = ({
  file,
  view,
  onToggleStar,
  onDelete,
  onRestore,
  onPreview,
}) => {
  const [copied, setCopied] = useState(false);

  // Logic to check if file is an image
  const isImage =
    file.file_type?.startsWith("image/") ||
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);

  // Function to handle sharing
  const handleShare = (e) => {
    e.stopPropagation(); // Prevent opening the preview modal
    navigator.clipboard.writeText(file.file_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group p-3 md:p-4 border border-gray-100 rounded-xl md:rounded-2xl hover:shadow-md transition-all bg-white relative">
      {/* Star Action */}
      {view !== "trash" && (
        <button
          onClick={(e) => onToggleStar(e, file.id, "file")}
          className="absolute top-2 left-2 z-10"
        >
          <Star
            size={16}
            className={`${
              file.is_starred
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            }`}
          />
        </button>
      )}

      {/* Main Content Area */}
      <div
        onClick={() => onPreview(file)}
        className="flex flex-col items-center text-center gap-2 md:gap-3 cursor-pointer"
      >
        <div className="w-full h-24 md:h-32 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden border border-gray-50">
          {isImage ? (
            <img
              src={file.file_url}
              alt={file.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <FileText className="text-blue-500" size={40} />
          )}
        </div>
        <span className="text-xs md:text-sm font-medium text-gray-700 truncate w-full px-1">
          {file.name}
        </span>
      </div>

      {/* Action Buttons (Top Right) */}
      <div className="absolute top-2 right-2 flex gap-1 z-20">
        {view === "trash" ? (
          <>
            {/* Restore Button */}
            <button
              onClick={(e) => onRestore(e, file.id, "file")}
              className="p-1.5 bg-white shadow-sm text-green-500 rounded-full hover:bg-green-50 transition-all"
              title="Restore"
            >
              <RefreshCw size={14} />
            </button>
            {/* Permanent Delete Button */}
            <button
              onClick={(e) => onDelete(e, file.id, "file")}
              className="p-1.5 bg-white shadow-sm text-red-500 rounded-full hover:bg-red-50 transition-all"
              title="Delete Permanently"
            >
              <Trash2 size={14} />
            </button>
          </>
        ) : (
          <>
            {/* Share Button (Only visible on hover) */}
            <button
              onClick={handleShare}
              className="p-1.5 bg-white shadow-sm text-blue-500 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-blue-50 transition-all"
              title="Copy Share Link"
            >
              {copied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Share2 size={14} />
              )}
            </button>
            {/* Move to Trash Button (Only visible on hover) */}
            <button
              onClick={(e) => onDelete(e, file.id, "file")}
              className="p-1.5 bg-white shadow-sm text-gray-400 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-500 transition-all"
              title="Move to Trash"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileCard;
