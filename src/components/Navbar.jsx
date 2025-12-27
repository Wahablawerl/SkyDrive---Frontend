import { useState } from "react";
import { Search, Menu, X } from "lucide-react"; // Added X icon
import UserModal from "./UserModal";

const Navbar = ({ user, logout, onSearch, onOpenSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState(""); // Track internal input state

  const handleSearchChange = (val) => {
    setQuery(val);
    onSearch(val);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch(""); // Reset the file list filtering
  };

  return (
    <header className="flex items-center gap-2 md:gap-4 relative z-[100] w-full">
      {/* Menu Button - Mobile only */}
      <button
        onClick={onOpenSidebar}
        className="p-2.5 bg-gray-100 rounded-xl md:hidden text-gray-600 hover:bg-gray-200 active:scale-95 transition-all flex-shrink-0"
        aria-label="Open Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Search Container */}
      <div className="flex flex-1 items-center gap-2 md:gap-3 bg-gray-100 rounded-2xl px-3 md:px-4 py-2 md:py-2.5 focus-within:ring-2 ring-blue-500/50 focus-within:bg-white transition-all min-w-0 border border-transparent focus-within:border-blue-100">
        <Search className="text-gray-400 flex-shrink-0" size={18} />

        <input
          type="text"
          value={query} // Controlled component
          placeholder="Search in Drive"
          className="bg-transparent w-full outline-none text-sm text-gray-700 min-w-0 placeholder:text-gray-400"
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        {/* Clear Button - Only shows when there is text */}
        {query && (
          <button
            onClick={clearSearch}
            className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* User Profile Section */}
      <div className="relative flex-shrink-0 ml-1">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm cursor-pointer border-2 border-white ring-1 ring-gray-100"
        >
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </button>

        {isModalOpen && (
          <div className="absolute right-0 top-full mt-3 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <div
              className="fixed inset-0 bg-transparent z-[-1]"
              onClick={() => setIsModalOpen(false)}
            />
            <UserModal
              user={user}
              logout={logout}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
