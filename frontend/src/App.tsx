
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Plans from "./pages/Plans";
import Subscriptions from "./pages/Subscriptions";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Discounts from "./pages/Discounts";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080d1a]">

        {/* Temporary Navigation */}
        <nav className="flex flex-wrap gap-5 border-b border-gray-700 p-5">
          <Link to="/" className="font-bold text-white">
            SubscriptFlow
          </Link>

          <Link to="/dashboard" className="text-gray-300">Dashboard</Link>
          <Link to="/products" className="text-gray-300">Products</Link>
          <Link to="/plans" className="text-gray-300">Plans</Link>
          <Link to="/subscriptions" className="text-gray-300">Subscriptions</Link>
          <Link to="/invoices" className="text-gray-300">Invoices</Link>
          <Link to="/payments" className="text-gray-300">Payments</Link>
          <Link to="/discounts" className="text-gray-300">Discounts</Link>
          <Link to="/reports" className="text-gray-300">Reports</Link>
        </nav>

        {/* Application Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
