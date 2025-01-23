"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Clock,
  AlertCircle,
  ChevronDown,
  LogOut,
  KeyRound,
  ArrowUpDown,
  Trash2,
  ListCollapse,
  BarChart3,
  Hourglass,
  CheckCircle2,
  AlertTriangle,
  Clock1,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useUserStore from "@/store";
import StatCard from "../StatCard";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  dateSubmitted: string;
  submittedBy: string;
}

export default function AdminPanel() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Complaint>("dateSubmitted");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-indigo-100 text-indigo-800";
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="w-5 h-5 text-indigo-500" />;
      case "Medium":
        return <Clock className="w-5 h-5 text-purple-500" />;
      case "Low":
        return <ChevronDown className="w-5 h-5 text-indigo-400" />;
      default:
        return null;
    }
  };

  const handleSort = (field: keyof Complaint) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleComplaintDelete = (id: string) => {
    fetch(`/api/complaints/${id}`, {
      method: "DELETE",
    }).then(() => {
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    });
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const response = await fetch(`/api/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.status === 200) {
      complaints.map((complaint) => {
        if (complaint._id === id) {
          complaint.status = newStatus as
            | "Pending"
            | "In Progress"
            | "Resolved";
        }
      });
      fetchComplaints();
      toast.success("Complaint status updated successfully");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      useUserStore.setState({ user: null });
      router.push("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const filteredComplaints = complaints
    .filter((complaint) => {
      const matchesSearch =
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        complaint._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || complaint.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || complaint.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === "asc" ? 1 : -1;

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });

  async function fetchComplaints() {
    const response = await fetch("/api/complaints");
    const data = await response.json();
    setComplaints(data);
    console.log(complaints);
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    highPriority: complaints.filter((c) => c.priority === "High").length,
  };

  const statCards = [
    {
      title: "Total Complaints",
      value: stats.total,
      icon: BarChart3,
      iconColor: "text-gray-400",
      footerText: "All time complaints",
      footerBgColor: "bg-gray-50",
      footerTextColor: "text-gray-500",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      total: stats.total,
      icon: Hourglass,
      iconColor: "text-yellow-400",
      footerText: "Being handled",
      footerBgColor: "bg-yellow-50",
      footerTextColor: "text-yellow-700",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      total: stats.total,
      icon: CheckCircle2,
      iconColor: "text-green-400",
      footerText: "Completed",
      footerBgColor: "bg-green-50",
      footerTextColor: "text-green-700",
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      total: stats.total,
      icon: AlertTriangle,
      iconColor: "text-orange-400",
      footerText: "Urgent cases",
      footerBgColor: "bg-orange-50",
      footerTextColor: "text-orange-700",
    },
    {
      title: "Pending",
      value: stats.pending,
      total: stats.total,
      icon: Clock1,
      iconColor: "text-indigo-400",
      footerText: "Pending cases",
      footerBgColor: "bg-indigo-200",
      footerTextColor: "text-indigo-700",
    },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <KeyRound className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-400" />
            </div>
            <input
              type="text"
              placeholder="Search complaints..."
              className="block w-full pl-10 pr-3 py-2 border border-indigo-200 rounded-md leading-5 bg-white placeholder-indigo-400 focus:outline-none focus:placeholder-indigo-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-indigo-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-indigo-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-indigo-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSort("_id")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>ID</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Title</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Priority</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSort("dateSubmitted")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-100">
                {filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="hover:bg-indigo-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {complaint._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[10rem] truncate">
                      {complaint.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-1">
                        {getPriorityIcon(complaint.priority)}
                        <span className="text-indigo-600">
                          {complaint.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.dateSubmitted).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      <select
                        className="block w-full pl-3 pr-10 py-1 text-sm border-indigo-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white"
                        value={complaint.status}
                        onChange={(e) => {
                          handleStatusChange(complaint._id, e.target.value);
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => {
                          handleComplaintDelete(complaint._id);
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                        title="Delete complaint"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <ListCollapse
                        className="w-10 h-10 text-indigo-500 cursor-pointer"
                        onClick={() => {
                          router.push(`/admin/${complaint._id}`);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
