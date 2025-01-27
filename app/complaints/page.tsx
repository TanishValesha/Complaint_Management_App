"use client";

import React, { useState } from "react";
import { AlertCircle, Loader2, LogOut, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUserStore from "@/store";

type Priority = "Low" | "Medium" | "High";
type Category = "Product" | "Service" | "Support";

interface ComplaintForm {
  title: string;
  description: string;
  category: Category;
  priority: Priority;
}

const App = () => {
  const [formData, setFormData] = React.useState<ComplaintForm>({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const [errors, setErrors] = React.useState<Partial<ComplaintForm>>({});

  const categories: Category[] = ["Product", "Service", "Support"];
  const priorities: Priority[] = ["Low", "Medium", "High"];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const validateForm = (): boolean => {
    const newErrors: Partial<ComplaintForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (validateForm()) {
      const response = await fetch("/api/complaints", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, user: user?._id }),
      });
      if (response.status === 201) {
        toast.success("Complaint submitted successfully!");
        setFormData({
          title: "",
          description: "",
          category: "Product",
          priority: "Low",
        });
        setLoading(false);
        router.push("/thankyou");
      }
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/logout", {
        method: "POST",
      });
      useUserStore.setState({ user: null });
      router.push("/auth");
      setLoading(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <AlertCircle className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Submit a Complaint
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please provide details about your complaint below
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Complaint Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.title ? "border-red-300" : "border-gray-300"
              } px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Category,
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <div className="mt-2 space-y-2">
              {priorities.map((priority) => (
                <div key={priority} className="flex items-center">
                  <input
                    id={priority}
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as Priority,
                      })
                    }
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={priority}
                    className="ml-3 block text-sm text-gray-700"
                  >
                    {priority}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? "border-red-300" : "border-gray-300"
              } px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            <Send className="w-4 h-4 mr-2" />
            Submit Complaint
          </button>
        </form>
        <button
          disabled={loading}
          onClick={handleLogout}
          className="mt-8 flex w-full justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
