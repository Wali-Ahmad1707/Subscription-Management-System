
import {
  IndianRupee,
  Users,
  Repeat,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,800",
    change: "+12.5%",
    positive: true,
    icon: IndianRupee,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Active Subscriptions",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: Repeat,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Total Customers",
    value: "856",
    change: "+5.4%",
    positive: true,
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Overdue Invoices",
    value: "24",
    change: "-3.1%",
    positive: false,
    icon: AlertCircle,
    color: "bg-red-500/10 text-red-400",
  },
];

const revenue = [
  { month: "Jan", amount: 35 },
  { month: "Feb", amount: 50 },
  { month: "Mar", amount: 42 },
  { month: "Apr", amount: 68 },
  { month: "May", amount: 55 },
  { month: "Jun", amount: 82 },
  { month: "Jul", amount: 65 },
  { month: "Aug", amount: 90 },
  { month: "Sep", amount: 72 },
  { month: "Oct", amount: 100 },
  { month: "Nov", amount: 85 },
  { month: "Dec", amount: 95 },
];

const subscriptions = [
  {
    id: "#SUB-1001",
    customer: "Rahul Sharma",
    plan: "Premium Monthly",
    amount: "₹1,499",
    status: "Active",
  },
  {
    id: "#SUB-1002",
    customer: "Priya Verma",
    plan: "Basic Monthly",
    amount: "₹499",
    status: "Active",
  },
  {
    id: "#SUB-1003",
    customer: "Aman Gupta",
    plan: "Enterprise Yearly",
    amount: "₹14,999",
    status: "Pending",
  },
  {
    id: "#SUB-1004",
    customer: "Sneha Singh",
    plan: "Premium Monthly",
    amount: "₹1,499",
    status: "Active",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8 text-white">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-400">
            Monitor your subscription business performance.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10">
          <CalendarDays size={17} />
          Last 30 Days
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#111a2d] p-5 transition hover:-translate-y-1 hover:border-blue-500/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{stat.title}</p>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {stat.value}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-xs">
                {stat.positive ? (
                  <TrendingUp size={15} className="text-emerald-400" />
                ) : (
                  <TrendingDown size={15} className="text-red-400" />
                )}

                <span className={stat.positive ? "text-emerald-400" : "text-red-400"}>
                  {stat.change}
                </span>

                <span className="text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <p className="mt-1 text-sm text-gray-400">
              Monthly revenue performance
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold">₹2,45,800</p>
            <p className="text-xs text-emerald-400">+12.5% growth</p>
          </div>
        </div>

        <div className="mt-8 flex h-56 items-end justify-between gap-2">
          {revenue.map((item) => (
            <div
              key={item.month}
              className="flex h-full flex-1 flex-col items-center justify-end gap-3"
            >
              <div
                title={`${item.month}: ${item.amount}%`}
                className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-blue-700 to-blue-400 transition-all hover:from-purple-600 hover:to-purple-400"
                style={{ height: `${item.amount}%` }}
              />

              <span className="text-[10px] text-gray-500 sm:text-xs">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Subscriptions */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Subscriptions</h2>
            <p className="mt-1 text-sm text-gray-400">
              Latest customer subscription activity
            </p>
          </div>

          <button className="text-sm text-blue-400 hover:text-blue-300">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Subscription ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="px-6 py-4 text-blue-400">{sub.id}</td>
                  <td className="px-6 py-4">{sub.customer}</td>
                  <td className="px-6 py-4 text-gray-400">{sub.plan}</td>
                  <td className="px-6 py-4 font-medium">{sub.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      sub.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => window.location.href = "/subscriptions"}
          className="flex items-center justify-between rounded-2xl bg-blue-600 p-5 text-left transition hover:bg-blue-500"
        >
          <div>
            <p className="font-semibold">Create Subscription</p>
            <p className="mt-1 text-sm text-blue-100">
              Add a new customer subscription
            </p>
          </div>
          <Plus size={25} />
        </button>

        <button
          onClick={() => window.location.href = "/invoices"}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
        >
          <div>
            <p className="font-semibold">Manage Invoices</p>
            <p className="mt-1 text-sm text-gray-400">
              Review and manage billing records
            </p>
          </div>
          <Download size={23} />
        </button>
      </div>

    </div>
  );
}

export default Dashboard;
