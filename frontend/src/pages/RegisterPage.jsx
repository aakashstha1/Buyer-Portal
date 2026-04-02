import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { validateRegistration } from "../utils/validator";
import { register as registerApi } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateRegistration({ name, email, password });
    if (!isValid) {
      setErrors(errors);
      toast.error(Object.values(errors)[0]);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await registerApi(name, email, password);
      console.log(data);
      toast.success("Account created successfully!");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="Name"
            error={errors.name}
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="Email"
            error={errors.email}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="Password"
            error={errors.password}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
