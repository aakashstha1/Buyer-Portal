import React from "react";
import UserCard from "../../components/UserCard";
import PropertiesList from "../../components/PropertiesList";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <UserCard />
      <PropertiesList />
    </div>
  );
}

export default DashboardPage;
