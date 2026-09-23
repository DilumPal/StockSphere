"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Search, ArrowDownCircle, ArrowUpCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function InventoryPage() {
  const [stocks, setStocks] = useState([]);
  
  // Placeholder mock data if API is not yet seeded
  const mockStocks = [
    { id: 1, product: { name: "MacBook Pro 16", sku: "APP-MBP-16" }, warehouse: { name: "Main NY Warehouse" }, quantity: 45, reorderLevel: 10, lastUpdated: new Date().toISOString() },
    { id: 2, product: { name: "Dell XPS 15", sku: "DELL-XPS-15" }, warehouse: { name: "Main NY Warehouse" }, quantity: 5, reorderLevel: 15, lastUpdated: new Date().toISOString() },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Inventory Ledger</h1>
          <p className="text-slate-400 mt-1">Real-time stock levels across all warehouses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
              <ArrowDownCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Items Received</p>
              <h3 className="text-2xl font-bold text-white mt-1">1,204</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
              <ArrowUpCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Items Dispatched</p>
              <h3 className="text-2xl font-bold text-white mt-1">842</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold text-white mt-1">3</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Filter stock by SKU or Warehouse..." 
              className="pl-9 bg-slate-950 border-slate-800 text-slate-200 focus-visible:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Product / SKU</th>
                <th className="px-6 py-4 font-medium">Warehouse</th>
                <th className="px-6 py-4 font-medium text-right">Quantity In Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {mockStocks.map((s: any) => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-200">{s.product.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.product.sku}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
                      {s.warehouse.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-200">
                    {s.quantity}
                  </td>
                  <td className="px-6 py-4">
                    {s.quantity <= s.reorderLevel ? (
                      <span className="flex items-center gap-1.5 text-red-400 text-xs font-medium bg-red-500/10 w-fit px-2 py-1 rounded-full border border-red-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span> Low Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium bg-emerald-500/10 w-fit px-2 py-1 rounded-full border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Optimal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 text-xs">
                    {new Date(s.lastUpdated).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
