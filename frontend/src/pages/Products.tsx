
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  X,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("subscriptflow_products");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
  });

  // Save products in browser storage
  useEffect(() => {
    localStorage.setItem(
      "subscriptflow_products",
      JSON.stringify(products)
    );
  }, [products]);

  // Open form for adding a product
  const openAddForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
    });
    setShowForm(true);
  };

  // Add or update product
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingId !== null) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingId
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      setProducts((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...productData,
        },
      ]);
    }

    setShowForm(false);
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });

    setShowForm(true);
  };

  // Delete product
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((previous) =>
        previous.filter((product) => product.id !== id)
      );
    }
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.sku} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-7 text-white">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your products, pricing and inventory.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <Package className="mb-3 text-blue-400" />
          <p className="text-sm text-gray-400">Total Products</p>
          <h2 className="mt-2 text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <p className="text-sm text-gray-400">Available Stock</p>
          <h2 className="mt-2 text-2xl font-bold">
            {products.reduce((total, product) => total + product.stock, 0)}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111a2d] p-5">
          <p className="text-sm text-gray-400">Out of Stock</p>
          <h2 className="mt-2 text-2xl font-bold">
            {products.filter((product) => product.stock === 0).length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111a2d] px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name, SKU or category..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]">

        <div className="border-b border-white/10 p-5">
          <h2 className="font-semibold">Product Inventory</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-gray-400">{product.sku}</td>
                  <td className="px-6 py-4 text-gray-400">{product.category}</td>
                  <td className="px-6 py-4">₹{product.price.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      product.stock > 0
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}>
                      {product.stock > 0 ? "Available" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        aria-label={`Delete ${product.name}`}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Package size={35} className="mx-auto mb-3 text-gray-500" />
                    <p className="text-gray-400">
                      {search ? "No matching products found." : "No products added yet."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#111a2d] p-6">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId !== null ? "Edit Product" : "Add New Product"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {[
                { label: "Product Name", key: "name", type: "text" },
                { label: "SKU", key: "sku", type: "text" },
                { label: "Category", key: "category", type: "text" },
                { label: "Price (₹)", key: "price", type: "number" },
                { label: "Stock Quantity", key: "stock", type: "number" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="mb-2 block text-sm text-gray-300">
                    {field.label}
                  </label>

                  <input
                    required
                    type={field.type}
                    min={field.type === "number" ? "0" : undefined}
                    step={field.key === "price" ? "0.01" : undefined}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field.key]: e.target.value,
                      })
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1a] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold hover:bg-blue-500"
                >
                  {editingId !== null ? "Save Changes" : "Add Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;
