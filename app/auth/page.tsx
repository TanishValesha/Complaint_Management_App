"use client";

import React, { useState } from "react";
import { LogIn, UserPlus, KeyRound, Mail, User, Shield } from "lucide-react";

type Role = "User" | "Manager" | "Admin";
type AuthMode = "login" | "register";

interface AuthForm {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}

export default function Home() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<AuthForm>({
    email: "",
    password: "",
    name: "",
    role: "User",
  });
  const [errors, setErrors] = useState<Partial<AuthForm>>({});

  const roles: Role[] = ["User", "Manager", "Admin"];

  const validateForm = (): boolean => {
    const newErrors: Partial<AuthForm> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "register") {
      if (!formData.name?.trim()) {
        newErrors.name = "Name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      alert(`${mode === "login" ? "Login" : "Registration"} successful!`);

      // Reset form
      setFormData({
        email: "",
        password: "",
        name: "",
        role: "User",
      });
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <KeyRound className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {mode === "login"
              ? "Sign in to your account"
              : "Create a new account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {mode === "login" ? "Register now" : "Sign in"}
            </button>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow"
        >
          {mode === "register" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`pl-10 block w-full rounded-md border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`pl-10 block w-full rounded-md border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`pl-10 block w-full rounded-md border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-2 space-y-2">
                {roles.map((role) => (
                  <div key={role} className="flex items-center">
                    <input
                      id={role}
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as Role,
                        })
                      }
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={role}
                      className="ml-3 flex items-center text-sm text-gray-700"
                    >
                      <Shield className="h-4 w-4 mr-2 text-gray-400" />
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {mode === "login" ? (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign in
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
