import { ChangeEvent, FormEvent, useContext, useState, useId } from "react";
import { AuthContext } from "../AuthProvider";
import { Link } from "react-router";
import { User } from "../types/User";

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file= e.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData({...formData, image: reader.result.toString()});
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
    <div className="flex font-sans flex-col items-center mx-auto h-screen bg-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4 mt-40">
        <h2>Register</h2>
        <div className="flex flex-col space-y-6">
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
          <input
            type="date"
            name="birthDate"
            placeholder="Enter your birthday"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your genre
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <button type="submit">Register</button>
        {message && <p className="bg-red-700">{message}</p>}
      </form>
      <div className="table">
        
      </div>
    </div>
  );
};

export default Register;
