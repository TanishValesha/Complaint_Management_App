"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  ChevronDown,
  User,
  Calendar,
  Tag,
} from "lucide-react";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  dateSubmitted: string;
  userId: string;
  ownerEmail: string;
}

export default function ComplaintDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaint = () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await fetch(
        `/api/complaints/${unwrappedParams.id}`
      ).then((res) => res.json());
      if (response.status === 404) {
        setComplaint(null);
      } else {
        setComplaint(response.complaint);
      }
    }, 1000);
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaint();
  }, [unwrappedParams.id]);

  // const getComplaintUser = async () => {
  //   if (complaint?.userId) {
  //     const response = await fetch(`/api/users/${complaint.userId}`).then(
  //       (res) => res.json()
  //     );
  //     console.log("User:", response);
  //   }
  // };

  // getComplaintUser();

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "Medium":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "Low":
        return <ChevronDown className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

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

  if (loading || !complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    fetch(`/api/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => {
      complaint.status =
        (newStatus as "Pending") || "In Progress" || "Resolved";
      fetchComplaint();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Complaint #{complaint._id}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {complaint.title}
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {complaint.description}
                  </p>
                </div>

                {/* Timeline placeholder - could be expanded in the future */}
                <div className="border-t border-gray-200 pt-6"></div>
              </div>

              {/* Sidebar */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {complaint.ownerEmail}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {new Date(complaint.dateSubmitted).toLocaleDateString()}{" "}
                        at{" "}
                        {new Date(complaint.dateSubmitted).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Tag className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {complaint.category}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      {getPriorityIcon(complaint.priority)}
                      <span className="ml-2 text-gray-600">
                        {complaint.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Actions
                  </h3>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    value={complaint.status}
                    onChange={(e) => {
                      handleStatusChange(complaint._id, e.target.value);
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
