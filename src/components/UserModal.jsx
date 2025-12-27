import { LogOut, X, Mail } from "lucide-react";

const UserModal = ({ user, logout, onClose }) => {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Account
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center pb-4 border-b border-gray-50">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3 text-2xl font-bold shadow-lg shadow-blue-100">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <p className="font-bold text-gray-800 text-lg">{user?.username}</p>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          <Mail size={12} /> {user?.email}
        </p>
      </div>

      <button
        onClick={logout}
        className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-semibold text-sm"
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  );
};

export default UserModal;
