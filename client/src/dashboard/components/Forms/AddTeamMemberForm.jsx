import React, { useState } from "react";
import {
  Plus,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Shield,
} from "lucide-react";
import InputField from "../InputField";
import Button from "../Button";

export default function AddTeamMemberForm({
  onSubmit,
  onClose,
  isEdit = false,
  memberData = {},
}) {
  const [form, setForm] = useState({
    id: memberData?.id || null,
    teamId: memberData?.teamId || "",
    name: memberData?.name || "",
    email: memberData?.email || "",
    phone: memberData?.phone || "",
    location: memberData?.location || "",
    role: memberData?.role || "",
    accessRole: memberData?.accessRole || "Staff", // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center min-h-screen justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] md:max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Team Member" : "Add New Team Member"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {isEdit
                ? "Update team member details"
                : "Fill out the team member's information"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-6 grid grid-cols-1 overflow-y-auto sm:grid-cols-2 gap-4">
          <InputField
            label="Team ID"
            name="teamId"
            value={form.teamId}
            onChange={handleChange}
            required
            placeholder="TEAM-001"
            icon={FileText}
          />

          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            icon={User}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            icon={Mail}
          />

          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="123-456-7890"
            icon={Phone}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="San Francisco, CA"
            icon={MapPin}
          />

          <InputField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            placeholder="Product Manager"
            icon={User}
          />

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Role
            </label>
            <div className="relative">
              <select
                name="accessRole"
                value={form.accessRole}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
              <Shield className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="close"
            onClick={onClose}
            className="px-4 py-2 rounded-full"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            leftIcon={<Plus className="h-4 w-4" />}
            className="order-1 sm:order-2 flex-1 sm:flex-none"
          >
            {isEdit ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
    </div>
  );
}
