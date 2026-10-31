
import { useEffect, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Layers,
  CalendarDays,
  Repeat,
} from "lucide-react";

interface Plan {
  id: number;
  name: string;
  product: string;
  billingCycle: string;
  price: number;
  minQuantity: number;
  startDate: string;
  endDate: string;
  pauseAllowed: boolean;
  autoRenew: boolean;
}

interface Product {
  id: number;
  name: string;
}

const emptyForm = {
  name: "",
  product: "",
  billingCycle: "Monthly",
  price: "",
  minQuantity: "1",
  startDate: "",
  endDate: "",
  pauseAllowed: false,
  autoRenew: true,
};

function Plans() {
  const [plans, setPlans] = useState<Plan[]>(() => {
    try {
      const saved = localStorage.getItem("subscriptflow_plans");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("subscriptflow_products");
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
    localStorage.setItem("subscriptflow_plans", JSON.stringify(plans));
  }, [plans]);

  const openAddForm = () => {
    try {
      const saved = localStorage.getItem("subscriptflow_products");
      setProducts(saved ? JSON.parse(saved) : []);
    } catch {
      setProducts([]);
    }

    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const planData = {
      name: form.name.trim(),
      product: form.product,
      billingCycle: form.billingCycle,
      price: Number(form.price),
      minQuantity: Number(form.minQuantity),
      startDate: form.startDate,
      endDate: form.endDate,
      pauseAllowed: form.pauseAllowed,
      autoRenew: form.autoRenew,
    };

    if (editingId !== null) {
      setPlans((previous) =>
        previous.map((plan) =>
          plan.id === editingId ? { ...plan, ...planData } : plan
        )
      );
    } else {
      setPlans((previous) => [
        ...previous,
        { id: Date.now(), ...planData },
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
  };

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);

    setForm({
      name: plan.name,
      product: plan.product,
      billingCycle: plan.billingCycle,
      price: String(plan.price),
      minQuantity: String(plan.minQuantity),
      startDate: plan.startDate,
      endDate: plan.endDate,
      pauseAllowed: plan.pauseAllowed,
      autoRenew: plan.autoRenew,
    });

    try {
      const saved = localStorage.getItem("subscriptflow_products");
      setProducts(saved ? JSON.parse(saved) : []);
    } catch {
      setProducts([]);
    }

    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((previous) => previous.filter((plan) => plan.id !== id));
    }
  };

  const filteredPlans = plans.filter((plan) =>
    `${plan.name} ${plan.product} ${plan.billingCycle}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080d1a] px-4 py-3 text-sm text-white outline-none focus:border-blue-500";

  return (
    <div className="space-y-7 text-white">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Plans Management</h1>
          <p className="mt-1 text-sm text-gray-400">
            Create and manage subscription plans and billing policies.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Create Plan
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <Layers className="mb-3 text-blue-400" />
          <p className="text-sm text-gray-400">Total Plans</p>
          <h2 className="mt-2 text-2xl font-bold">{plans.length}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <Repeat className="mb-3 text-purple-400" />
          <p className="text-sm text-gray-400">Auto Renew Plans</p>
          <h2 className="mt-2 text-2xl font-bold">
            {plans.filter((plan) => plan.autoRenew).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <CalendarDays className="mb-3 text-emerald-400" />
          <p className="text-sm text-gray-400">Pause Allowed</p>
          <h2 className="mt-2 text-2xl font-bold">
            {plans.filter((plan) => plan.pauseAllowed).length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111a2d] px-4 py-3">
        <Search size={19} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plans..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>

      {/* Plans Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]">
        <div className="border-b border-white/10 p-5">
          <h2 className="font-semibold">Available Plans</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Billing Cycle</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Min Quantity</th>
                <th className="px-6 py-4">Policies</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-t border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-6 py-4 font-medium">{plan.name}</td>
                  <td className="px-6 py-4 text-gray-400">{plan.product}</td>
                  <td className="px-6 py-4">{plan.billingCycle}</td>
                  <td className="px-6 py-4 font-medium">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">{plan.minQuantity}</td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className={plan.autoRenew ? "text-emerald-400" : "text-gray-500"}>
                        {plan.autoRenew ? "Auto Renew" : "No Auto Renew"}
                      </span>
                      <span className={plan.pauseAllowed ? "text-blue-400" : "text-gray-500"}>
                        {plan.pauseAllowed ? "Pause Allowed" : "Pause Disabled"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(plan)}
                        aria-label={`Edit ${plan.name}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(plan.id)}
                        aria-label={`Delete ${plan.name}`}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPlans.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400">
                    No plans found. Create your first subscription plan.
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
                {editingId !== null ? "Edit Plan" : "Create New Plan"}
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
                    Plan Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Premium Monthly"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Select Product
                  </label>
                  <select
                    required
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Choose a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.name} className="bg-[#080d1a]">
                        {product.name}
                      </option>
                    ))}
                  </select>
                  {products.length === 0 && (
                    <p className="mt-2 text-xs text-yellow-400">
                      Add a product first from the Products page.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Billing Cycle
                  </label>
                  <select
                    value={form.billingCycle}
                    onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
                    className={inputClass}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Price (₹)
                  </label>
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="1499"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Minimum Quantity
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.minQuantity}
                    onChange={(e) => setForm({ ...form, minQuantity: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Availability Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Availability End Date
                  </label>
                  <input
                    type="date"
                    min={form.startDate || undefined}
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-white/10 bg-[#080d1a] p-4">
                <label className="flex items-center gap-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.pauseAllowed}
                    onChange={(e) => setForm({ ...form, pauseAllowed: e.target.checked })}
                    className="h-4 w-4 accent-blue-500"
                  />
                  Allow customers to pause subscriptions
                </label>

                <label className="flex items-center gap-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.autoRenew}
                    onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
                    className="h-4 w-4 accent-blue-500"
                  />
                  Enable automatic renewal
                </label>
              </div>

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
                  disabled={products.length === 0}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingId !== null ? "Save Changes" : "Create Plan"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Plans;
