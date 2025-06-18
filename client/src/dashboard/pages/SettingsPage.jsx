import React, { useState, useMemo } from "react";
import { User, Search } from "lucide-react";
import Button from "../components/Button";
import { settingsData } from "../..";

const SettingsTable = ({ settings, onEdit }) => {
  return (
    <>
      {/* Table for md+ screens */}
      <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-300 overflow-x-auto">
        <table className="w-full min-w-[400px] border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-sm font-semibold text-gray-700">
              {["Setting", "Value", "Actions"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settings.map(({ id, key, value }) => (
              <tr
                key={id}
                className="text-gray-800 hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 font-medium">{key}</td>
                <td className="px-6 py-4">{value}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(id)}
                    className="transition hover:scale-105"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grid cards for mobile (below md) */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {settings.map(({ id, key, value }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-md border border-gray-300 p-4 flex flex-col space-y-3"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-gray-900 font-semibold text-lg">{key}</h4>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(id)}
                className="transition hover:scale-105"
              >
                Edit
              </Button>
            </div>
            <p className="text-gray-700 text-base">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default function SettingsPage() {
  const categories = [
    { id: "general", label: "General" },
    { id: "team", label: "Team" },
    { id: "billing", label: "Billing & Payment" },
    { id: "notifications", label: "Notifications" },
  ];

  const [activeCategory, setActiveCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSettings = useMemo(() => {
    const allSettings = settingsData[activeCategory] || [];
    if (!searchTerm) return allSettings;
    return allSettings.filter((s) =>
      (s.key + " " + s.value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeCategory, searchTerm]);

  const handleEdit = (id) => {
    alert(`Edit setting ID: ${id}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white px-6 py-4 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search with icon */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder={`Search ${activeCategory} settings...`}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <nav className="flex flex-wrap gap-3 px-2 sm:px-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => {
              setActiveCategory(cat.id);
              setSearchTerm("");
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Settings Table or Grid */}
      {filteredSettings.length > 0 ? (
        <SettingsTable settings={filteredSettings} onEdit={handleEdit} />
      ) : (
        <div className="bg-white rounded-xl text-center shadow-md border border-gray-200 p-12">
          <User className="h-14 w-14 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No settings found
          </h3>
          <p className="text-gray-600">Try adjusting your search or category.</p>
        </div>
      )}
    </div>
  );
}
