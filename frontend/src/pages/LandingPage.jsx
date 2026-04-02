import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Shield, TrendingUp, Home } from "lucide-react";

const features = [
  {
    icon: <MapPin size={20} />,
    title: "Location Smart",
    desc: "Find properties in the exact neighbourhoods that matter to you.",
  },
  {
    icon: <Shield size={20} />,
    title: "Verified Listings",
    desc: "Every property is reviewed and verified before going live.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Market Insights",
    desc: "Real-time data to help you make the right investment decision.",
  },
  {
    icon: <Home size={20} />,
    title: "Save Favourites",
    desc: "Bookmark properties and revisit them anytime from any device.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans ">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
            Real Estate Platform
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight max-w-2xl">
            Find your next{" "}
            <span className="text-indigo-600">dream property</span> with ease
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Browse thousands of verified listings, save your favourites, and
            connect with agents — all in one place.
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              to="/register"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-3 gap-6 text-center">
        {[
          { value: "12,000+", label: "Active Listings" },
          { value: "4,800+", label: "Happy Clients" },
          { value: "98%", label: "Satisfaction Rate" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-gray-100 rounded-2xl py-8 shadow-sm"
          >
            <p className="text-3xl font-bold text-indigo-600">{s.value}</p>
            <p className="text-sm text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-7 bg-amber-500 rounded-sm" />
          <h2 className="text-2xl font-bold text-gray-800">Why choose us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{f.title}</p>
                <p className="text-sm text-gray-400 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-2xl mx-auto text-center px-6 flex flex-col items-center gap-5">
          <h2 className="text-3xl font-bold text-white">
            Ready to find your home?
          </h2>
          <p className="text-indigo-200 text-base">
            Join thousands of people who found their perfect property on our
            platform.
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition"
          >
            Create a Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
