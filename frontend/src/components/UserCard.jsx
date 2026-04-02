import React from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";
import { IdCard, Mail, Shield } from "lucide-react";

function UserCard() {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;

  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-lg px-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
          Account Info
        </h3>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          Active
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-4" />

      {/* Info Row */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <IdCard size={16} className="text-gray-400" />
          <p className="text-sm text-gray-400">Full Name</p>
          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <Mail size={16} className="text-gray-400" />
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <Shield size={16} className="text-indigo-400" />
          <p className="text-sm text-gray-400">Role</p>
          <p className="text-sm font-semibold text-indigo-600">
            {capitalize(user?.role)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
