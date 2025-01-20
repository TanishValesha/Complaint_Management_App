"use client";

import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Thank You for Your Submission!
          </h1>

          <div className="prose prose-indigo">
            <p className="text-gray-600">
              Your complaint has been successfully received. Our team will
              review it and take appropriate action.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="text-sm text-gray-600">
              We aim to respond within:
              <div className="font-semibold text-indigo-600 mt-1">
                24-48 business hours
              </div>
            </div>

            <Link
              href="/complaints"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Need immediate assistance?
          <a
            href="mailto:support@example.com"
            className="ml-1 text-indigo-600 hover:text-indigo-500"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
