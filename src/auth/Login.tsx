import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Link, useNavigate } from "react-router";
import { User } from "../types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPaassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPaassword((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect if already logged in
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await login(formData);

    if (result.success) {
      navigate("/home");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="flex font-sans flex-col items-center mx-auto h-screen bg-[#09112b]">
      <form onSubmit={handleSubmit} className="space-y-4 mt-40 text-center">
        <h1 className="text-white size-10 text-3xl w-full">Login</h1>
        <div className="flex flex-col space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="shadow-lg shadow-yellow-700 rounded min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="shadow-lg shadow-yellow-700 rounded w-full border p-2 focus:border-yellow-700 focus:outline-yellow-700"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 focus:outline-none"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
        </div>
        <p className="text-white">
          Don't have an account?{" "}
          <Link to="/register" className="hover:text-yellow-700">
            Register here
          </Link>
        </p>
        <button
          type="submit"
          className="bg-yellow-700 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-800 transition"
        >
          Login
        </button>
        {message && <p className="text-red-700">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
