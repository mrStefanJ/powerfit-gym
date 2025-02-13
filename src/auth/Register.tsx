import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useContext, useId, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider";
import useImageUplod from "../customHooks/useImageUpload";
import { User } from "../types/User";
import Loading from "../componenets/Loading/Loading";

const Register = () => {
  const { register } = useContext(AuthContext);
  const { image, handleImageChange } = useImageUplod();
  const [formData, setFormData] = useState<User>({
    id: useId(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPaassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPaassword((prev) => !prev);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const uploadFormData = { ...formData, image: image || "" };
    const result = await register(uploadFormData);

    if (result.success) {
      const storedUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const updatedUsers = [...storedUsers, uploadFormData];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      setMessage(result.message);

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } else {
      setMessage(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex font-sans flex-col items-center mx-auto h-screen bg-[#09112b]">
      <form onSubmit={handleSubmit} className="space-y-4 mt-40 text-center">
        <h1 className="text-white size-10 text-3xl w-full">Register</h1>
        <div className="flex flex-col space-y-6">
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className="shadow-lg shadow-yellow-700 rounded min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className="shadow-lg shadow-yellow-700 rounded min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
          <input
            type="date"
            name="birthDate"
            placeholder="Enter your birthday"
            className="cursor-pointer shadow-lg shadow-yellow-700 rounded min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            value={formData.birthDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            className="cursor-pointer shadow-lg shadow-yellow-700 rounded min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your genre
            </option>
            <option
              value="male"
              className="px-3 py-2 cursor-pointer text-yellow-700 hover:bg-yellow-700"
            >
              Male
            </option>
            <option
              value="female"
              className="px-3 py-2 cursor-pointer text-yellow-700 hover:bg-yellow-700"
            >
              Female
            </option>
          </select>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            className="hidden"
            onChange={handleImageChange}
            required
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-yellow-700 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-800 transition"
          >
            Upload Image
          </label>
          {image && (
            <img
              src={image}
              alt="Uploaded Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full"
            />
          )}
        </div>
        <p className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-yellow-700">
            Login here
          </Link>
        </p>
        <button
          type="submit"
          className="bg-yellow-700 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-800 transition"
        >
          {loading ? (
            <Loading color="fill-white" />) : "Register" }
        </button>
        {message && (
          <p
            className={`mt-2 px-4 py-2 rounded ${
              message.includes("success") ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
