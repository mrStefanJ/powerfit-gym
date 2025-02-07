import { ChangeEvent, FormEvent, useContext, useState, useId } from "react";
import { AuthContext } from "../AuthProvider";
import { Link } from "react-router";
import { User } from "../types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const { register } = useContext(AuthContext);
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

  const togglePasswordVisibility = () => {
    setShowPaassword((prev) => !prev);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData({ ...formData, image: reader.result.toString() });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = register(formData);
    setMessage(result.message);
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
          Register
        </button>
        {message && <p className="bg-red-700">{message}</p>}
      </form>
      <div className="table"></div>
    </div>
  );
};

export default Register;
