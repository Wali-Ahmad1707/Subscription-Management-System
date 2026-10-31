
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Repeat,
  FileText,
  CreditCard,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/products", icon: Package },
  { name: "Plans", path: "/plans", icon: Layers },
  { name: "Subscriptions", path: "/subscriptions", icon: Repeat },
  { name: "Invoices", path: "/invoices", icon: FileText },
  { name: "Payments", path: "/payments", icon: CreditCard },
  { name: "Discounts", path: "/discounts", icon: Tag },
  { name: "Reports", path: "/reports", icon: BarChart3 },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0d1424] text-white">

      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Zap size={23} className="text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide">
            SubscriptFlow
          </h1>
          <p className="text-xs text-gray-400">
            Subscription Manager
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <p className="mb-4 mt-10 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Preferences
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Settings size={19} />
          Settings
        </NavLink>
      </div>

      {/* Bottom Profile */}
      <div className="border-t border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
