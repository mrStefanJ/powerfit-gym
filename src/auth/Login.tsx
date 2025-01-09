import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Link, useNavigate } from "react-router";
import { User } from "../types/User";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState<User>({ id:"" ,email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect if already logged in
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(formData);

    if (result.success) {
      navigate("/home"); // Navigate to home page on successful login
    } else {
      setMessage(result.message);
    }

  };

  return (
    <div className="flex font-sans flex-col items-center mx-auto h-screen bg-gray-700">
    <form onSubmit={handleSubmit} className="space-y-4 mt-40">
      <h2>Login</h2>
      <div className="flex flex-col space-y-6">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      </div>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      <button type="submit">Login</button>
      {message && <p className="text-red-700">{message}</p>}
    </form>
    </div>
  );
};

export default Login;
