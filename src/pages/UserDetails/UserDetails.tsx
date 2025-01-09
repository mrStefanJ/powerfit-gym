import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Category, Exercise } from "../../types/Exercis";

const UserDetails = () => {
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    fetchExercise();
  }, []);

  const fetchExercise = () => {
    const data = localStorage.getItem("exercises");

    if (data) {
      const parseData = JSON.parse(data);
      setExercises(parseData.exercis || []);
      setDate(parseData.date);
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("selectedUser");
    navigate(-1);
  };

  if (!user) {
    return <div>No User Selected</div>;
  }

  console.log(exercises);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="border p-4 rounded shadow">
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Birth Date:</strong> {user.birthDate}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Group:</strong> {user.group}
        </p>
        {user.image && (
          <img
            src={user.image}
            alt="User"
            className="w-32 h-32 mt-4 rounded-full border"
          />
        )}
      </div>

      <div className="table-exercises">
        <h3 className="text-xl font-semibold mb-2">Exercises</h3>
        <div>
          <h3>Date: {date}</h3>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {exercises.length > 0 ? (
              exercises.map((e: any) =>
                e.workout.map((w: Exercise) => (
                  <tr key={w.id}>
                    <td className="border p-2">{w.id}</td>
                    <td className="border p-2">{w.title}</td>
                    <td className="border p-2">{w.status}</td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  No Exercises Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
