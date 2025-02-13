import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Loading from "../componenets/Loading/Loading";
import useImageUpload from "../customHooks/useImageUpload";
import { User } from "../types/User";

interface CreateUserProps {
  title: string;
  userData: User;
  errorImage: string;
  toggleModalUser: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ModalUser = ({
  title,
  userData,
  errorImage,
  toggleModalUser,
  handleInputChange,
  loading,
  handleSubmit,
}: CreateUserProps) => {
  const [showPassword, setShowPaassword] = useState(false);
  const { image, handleImageChange } = useImageUpload();

  const togglePasswordVisibility = () => {
    setShowPaassword((prev) => !prev);
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2 relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-8 text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <div className="mb-2">
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={userData.birthDate}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2 mt-6">
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
          <p>{errorImage}</p>
          </div>
          <div className="mb-2">
            <label>Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="group">
            <label>Group</label>
            <select
              name="group"
              value={userData.group}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select group</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={toggleModalUser}
              className="bg-red-500 text-white px-4 py-2 mr-2 rounded shadow-md hover:bg-red-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-700 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-800 transition"
            >
              {loading ? <Loading color="fill-white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
