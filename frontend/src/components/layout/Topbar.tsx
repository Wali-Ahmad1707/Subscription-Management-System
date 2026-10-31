
import { Search, Bell, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#080d1a]/90 px-8 backdrop-blur-xl">

      {/* Left Section */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Welcome back, Admin 👋
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Here's what's happening with your subscriptions today.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 md:flex">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-48 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
          <span className="rounded border border-white/10 px-1.5 py-0.5 text-xs text-gray-500">
            /
          </span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-white/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>

          <ChevronDown size={16} className="text-gray-400" />
        </button>

      </div>
    </header>
  );
}

export default Topbar;
