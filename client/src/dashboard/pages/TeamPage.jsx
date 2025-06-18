import React, { useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import AddTeamMemberForm from "../components/Forms/AddTeamMemberForm"; // You need to create this
import { team as teamData } from "../.."; // Replace with your actual data source

const TeamTable = ({ team, onEdit, onDelete, onView }) => (
  <>
    {/* Table for md+ */}
    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              {["Team ID", "Name", "Role", "Email", "Location", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {team.map((member) => (
              <tr
                key={member.id}
                className="border-t border-gray-300 text-sm text-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {member.teamId}
                </td>
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.role}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">{member.location}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onView(member.id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => onEdit(member.id)}
                    >
                      Edit
                    </Button>
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold"
                      onClick={() => onDelete(member.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Cards for mobile */}
    <div className="md:hidden grid grid-cols-1 gap-4">
      {team.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-xl shadow-sm border border-gray-300 p-4 flex flex-col space-y-3"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-900 font-semibold text-lg">
              {member.teamId}
            </h4>
          </div>
          <p>
            <span className="font-semibold">Name: </span>
            {member.name}
          </p>
          <p>
            <span className="font-semibold">Role: </span>
            {member.role}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {member.email}
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            {member.location}
          </p>

          <div className="flex items-center gap-4 mt-2 flex-row-reverse">
            <button
              className="text-red-600 hover:text-red-800 font-semibold"
              onClick={() => onDelete(member.id)}
            >
              Delete
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(member.id)}
            >
              Edit
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onView(member.id)}
            >
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  </>
);

export default function TeamPage() {
  const [team, setTeam] = useState(teamData);
  const [showForm, setShowForm] = useState(false);
  const [editTeamMember, setEditTeamMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeam = useMemo(() => {
    return team.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [team, searchTerm]);

  const handleEdit = (id) => {
    const member = team.find((t) => t.id === id);
    setEditTeamMember(member);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setTeam((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleView = (id) => {
    console.log("View team member:", id);
    alert(
      `👤 Team Member Details:\n\nName: ${
        team.find((m) => m.id === id)?.name
      }\nRole: ${team.find((m) => m.id === id)?.role}\nEmail: ${
        team.find((m) => m.id === id)?.email
      }\nLocation: ${team.find((m) => m.id === id)?.location}`
    );
  };

  const handleSaveTeamMember = (data) => {
    if (editTeamMember) {
      setTeam((prev) =>
        prev.map((t) => (t.id === data.id ? { ...t, ...data } : t))
      );
    } else {
      setTeam((prev) => [...prev, { ...data, id: Date.now() }]);
    }

    setShowForm(false);
    setEditTeamMember(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTeamMember(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <PageHeader
          title="Team"
          showSearch
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditTeamMember(null);
                setShowForm(true);
              }}
            >
              New Member
            </Button>
          )}
        />
      </div>

      {showForm && (
        <AddTeamMemberForm
          isEdit={!!editTeamMember}
          memberData={editTeamMember}
          onSubmit={handleSaveTeamMember}
          onClose={handleCloseForm}
        />
      )}

      <TeamTable
        team={filteredTeam}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {filteredTeam.length === 0 && (
        <div className="bg-white rounded-xl text-center shadow-sm border border-gray-100 p-8">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No team members found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
          <Button variant="primary" size="md" onClick={() => setShowForm(true)}>
            Add Member
          </Button>
        </div>
      )}
    </div>
  );
}
