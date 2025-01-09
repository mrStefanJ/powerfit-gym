const CreateUser = ({
  formData,
  toggleModalUser,
  handleInputChange,
  handleImageChange,
  handleSubmit,
}: any) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData?.firstName}
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
              value={formData?.lastName}
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
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData?.birthDate}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label>Gender</label>
            <select
              name="gender"
              value={formData?.gender}
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
              value={formData?.group}
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
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
