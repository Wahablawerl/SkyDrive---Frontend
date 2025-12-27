import { X, ExternalLink, Download, Maximize2 } from "lucide-react";

const ImagePreviewModal = ({ file, onClose }) => {
  if (!file) return null;

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(file.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(file.file_url, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300">
      {/* 1. Glassmorphism Header Toolbar (Fixed at Top) */}
      <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 md:px-12 bg-gradient-to-b from-black/60 to-transparent z-[1000]">
        <div className="flex flex-col">
          <h2 className="text-white font-medium truncate max-w-[200px] md:max-w-md">
            {file.name}
          </h2>
          <span className="text-gray-400 text-xs uppercase tracking-widest">
            {file.file_type?.split("/")[1] || "Image"}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/10 group"
          >
            <Download
              size={18}
              className="group-hover:translate-y-0.5 transition-transform"
            />
            <span className="hidden md:inline text-sm">Download</span>
          </button>

          <a
            href={file.file_url}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all"
            title="Open Original"
          >
            <ExternalLink size={20} />
          </a>

          <div className="h-8 w-[1px] bg-white/10 mx-1 hidden md:block" />

          <button
            onClick={onClose}
            className="p-2.5 bg-red-500/10 hover:bg-red-500 text-white rounded-full border border-red-500/20 transition-all group"
            title="Close (Esc)"
          >
            <X
              size={24}
              className="group-hover:rotate-90 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* 2. Main Viewport Area */}
      <div className="relative w-full h-full flex items-center justify-center group">
        {/* Backdrop Close Click Area */}
        <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

        {/* The Image Wrapper */}
        <div className="relative max-w-full max-h-full flex items-center justify-center p-4">
          <img
            src={file.file_url}
            alt={file.name}
            className="max-h-[80vh] md:max-h-[85vh] w-auto object-contain rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 animate-in zoom-in duration-300 select-none"
          />

          {/* Subtle Hover Info for big screens */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full border border-white/10">
            Click background to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
