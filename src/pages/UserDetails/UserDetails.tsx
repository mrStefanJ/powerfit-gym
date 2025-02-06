import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { db } from "../../configuration";
import { doc, getDoc } from "firebase/firestore";
import { UserExercise, User } from "../../types/User";
import { Workout } from "../../types/Exercis";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    if (id) {
      fetchUserDetails(id);
    }
  }, [id]);

  const fetchUserDetails = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const response = await getDoc(userDocRef);

      if (response.exists()) {
        const data = response.data();
        setUser(data as User);
        setExercises(data.exercise)
      } else {
        console.error("No user found with the given ID");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details");
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("selectedUser");
    navigate(-1);
  };

  // Show error message or loading state if necessary
  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <section className="p-6">
      <div className="flex justify-between mt-4 mb-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between border p-4 rounded shadow">
        <div><p>
          <strong>First Name:</strong> {user?.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Birth Date:</strong> {user?.birthDate}
        </p>
        <p>
          <strong>Gender:</strong> {user?.gender}
        </p>
        <p>
          <strong>Group:</strong> {user?.group}
        </p></div>
        <div>
        {user?.image && (
          <img
            src={user?.image}
            alt="User"
            className="w-32 h-32 m-4 border"
          />
        )}
        </div>
      </div>
      <div className="table-exercises">
        <h3 className="text-xl font-semibold mb-2">Exercises</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Sets</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {exercises ? (
              exercises.map((e: UserExercise) =>
                e.workout.map((w: Workout) => (
                  <tr key={w.id}>
                    <td className="border p-2">{w.title}</td>
                    <td className="border p-2">{w.sets}</td>
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
    </section>
  );
};

export default UserDetails;
