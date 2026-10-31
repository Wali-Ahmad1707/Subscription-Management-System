
import { useEffect, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Repeat,
  Users,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

type SubscriptionStatus =
  | "Draft"
  | "Quotation"
  | "Confirmed"
  | "Active"
  | "Paused"
  | "Closed";

interface Plan {
  id: number;
  name: string;
  product: string;
  billingCycle: string;
  price: number;
  minQuantity: number;
  autoRenew: boolean;
  pauseAllowed: boolean;
}

interface Subscription {
  id: number;
  customerName: string;
  email: string;
  planId: number;
  planName: string;
  product: string;
  quantity: number;
  unitPrice: number;
  billingCycle: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
}

const emptyForm = {
  customerName: "",
  email: "",
  planId: "",
  quantity: "1",
  startDate: "",
  endDate: "",
  status: "Draft" as SubscriptionStatus,
  autoRenew: true,
};

const statuses: SubscriptionStatus[] = [
  "Draft",
  "Quotation",
  "Confirmed",
  "Active",
  "Paused",
  "Closed",
];

const statusStyles: Record<SubscriptionStatus, string> = {
  Draft: "bg-gray-500/10 text-gray-400",
  Quotation: "bg-purple-500/10 text-purple-400",
  Confirmed: "bg-blue-500/10 text-blue-400",
  Active: "bg-emerald-500/10 text-emerald-400",
  Paused: "bg-yellow-500/10 text-yellow-400",
  Closed: "bg-red-500/10 text-red-400",
};

function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>(() => {
    try {
      const saved = localStorage.getItem("subscriptflow_plans");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    try {
      const saved = localStorage.getItem("subscriptflow_subscriptions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "subscriptflow_subscriptions",
      JSON.stringify(subscriptions)
    );
  }, [subscriptions]);

  const selectedPlan = plans.find(
    (plan) => plan.id === Number(form.planId)
  );

  const openAddForm = () => {
    try {
      const saved = localStorage.getItem("subscriptflow_plans");
      setPlans(saved ? JSON.parse(saved) : []);
    } catch {
      setPlans([]);
    }

    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const plan = plans.find(
      (item) => item.id === Number(form.planId)
    );

    if (!plan) {
      alert("Please select a valid subscription plan.");
      return;
    }

    if (Number(form.quantity) < plan.minQuantity) {
      alert(`Minimum quantity for this plan is ${plan.minQuantity}.`);
      return;
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      alert("End date cannot be before the start date.");
      return;
    }

    const subscriptionData = {
      customerName: form.customerName.trim(),
      email: form.email.trim(),
      planId: plan.id,
      planName: plan.name,
      product: plan.product,
      quantity: Number(form.quantity),
      unitPrice: plan.price,
      billingCycle: plan.billingCycle,
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      autoRenew: form.autoRenew && plan.autoRenew,
    };

    if (editingId !== null) {
      setSubscriptions((previous) =>
        previous.map((subscription) =>
          subscription.id === editingId
            ? { ...subscription, ...subscriptionData }
            : subscription
        )
      );
    } else {
      setSubscriptions((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...subscriptionData,
        },
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
  };

  const handleEdit = (subscription: Subscription) => {
    try {
      const saved = localStorage.getItem("subscriptflow_plans");
      setPlans(saved ? JSON.parse(saved) : []);
    } catch {
      setPlans([]);
    }

    setEditingId(subscription.id);

    setForm({
      customerName: subscription.customerName,
      email: subscription.email,
      planId: String(subscription.planId),
      quantity: String(subscription.quantity),
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      status: subscription.status,
      autoRenew: subscription.autoRenew,
    });

    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this subscription permanently?")) {
      setSubscriptions((previous) =>
        previous.filter((subscription) => subscription.id !== id)
      );
    }
  };

  const updateStatus = (id: number, status: SubscriptionStatus) => {
    setSubscriptions((previous) =>
      previous.map((subscription) =>
        subscription.id === id
          ? { ...subscription, status }
          : subscription
      )
    );
  };

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    `${subscription.customerName} ${subscription.email} ${subscription.planName} ${subscription.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalValue = subscriptions.reduce(
    (total, subscription) =>
      total + subscription.unitPrice * subscription.quantity,
    0
  );

  const activeCount = subscriptions.filter(
    (subscription) => subscription.status === "Active"
  ).length;

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080d1a] px-4 py-3 text-sm text-white outline-none focus:border-blue-500";

  return (
    <div className="space-y-7 text-white">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Subscription Management
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage customer subscriptions and their lifecycle.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Create Subscription
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <Repeat className="mb-3 text-blue-400" />
          <p className="text-sm text-gray-400">Total Subscriptions</p>
          <h2 className="mt-2 text-2xl font-bold">
            {subscriptions.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <Users className="mb-3 text-emerald-400" />
          <p className="text-sm text-gray-400">Active Subscriptions</p>
          <h2 className="mt-2 text-2xl font-bold">{activeCount}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <IndianRupee className="mb-3 text-purple-400" />
          <p className="text-sm text-gray-400">Total Subscription Value</p>
          <h2 className="mt-2 text-2xl font-bold">
            ₹{totalValue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <CalendarDays className="mb-3 text-yellow-400" />
          <p className="text-sm text-gray-400">Paused Subscriptions</p>
          <h2 className="mt-2 text-2xl font-bold">
            {subscriptions.filter((s) => s.status === "Paused").length}
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111a2d] px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer, email, plan or status..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>

      {/* Subscription Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]">

        <div className="border-b border-white/10 p-5">
          <h2 className="font-semibold">All Subscriptions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Billing</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className="border-t border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium">{subscription.customerName}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {subscription.email}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p>{subscription.planName}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {subscription.product}
                    </p>
                  </td>

                  <td className="px-6 py-4">{subscription.quantity}</td>

                  <td className="px-6 py-4 font-medium">
                    ₹{(subscription.unitPrice * subscription.quantity).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {subscription.billingCycle}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={subscription.status}
                      onChange={(e) =>
                        updateStatus(
                          subscription.id,
                          e.target.value as SubscriptionStatus
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs outline-none ${statusStyles[subscription.status]}`}
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-[#111a2d] text-white"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(subscription)}
                        aria-label="Edit subscription"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(subscription.id)}
                        aria-label="Delete subscription"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredSubscriptions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400">
                    No subscriptions found. Create your first subscription.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111a2d] p-6">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId !== null ? "Edit Subscription" : "Create Subscription"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Customer Name
                  </label>
                  <input
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    placeholder="Enter customer name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Customer Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="customer@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Select Plan
                  </label>
                  <select
                    required
                    value={form.planId}
                    onChange={(e) => {
                      const plan = plans.find((p) => p.id === Number(e.target.value));
                      setForm({
                        ...form,
                        planId: e.target.value,
                        autoRenew: plan?.autoRenew ?? false,
                      });
                    }}
                    className={inputClass}
                  >
                    <option value="">Choose a plan</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id} className="bg-[#080d1a]">
                        {plan.name} - ₹{plan.price}
                      </option>
                    ))}
                  </select>
                  {plans.length === 0 && (
                    <p className="mt-2 text-xs text-yellow-400">
                      Create a plan before creating a subscription.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Quantity
                  </label>
                  <input
                    required
                    type="number"
                    min={selectedPlan?.minQuantity ?? 1}
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Start Date
                  </label>
                  <input
                    required
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    min={form.startDate || undefined}
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Subscription Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as SubscriptionStatus })}
                    className={inputClass}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className="bg-[#080d1a]">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {selectedPlan && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-sm text-gray-400">Subscription Price</p>
                  <h3 className="mt-1 text-xl font-bold text-blue-400">
                    ₹{(selectedPlan.price * Math.max(0, Number(form.quantity) || 0)).toLocaleString("en-IN")}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedPlan.billingCycle} billing · ₹{selectedPlan.price} per unit
                  </p>
                </div>
              )}

              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.autoRenew}
                  onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
                  className="h-4 w-4 accent-blue-500"
                />
                Enable automatic renewal
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={plans.length === 0}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingId !== null ? "Save Changes" : "Create Subscription"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Subscriptions;

