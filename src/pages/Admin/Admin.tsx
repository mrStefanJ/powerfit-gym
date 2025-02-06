import { useEffect, useState } from "react";
import DoughnutChart from "../../componenets/Chart/DoughnutChart";
import Footer from "../../componenets/Footer/Footer";
import { User } from "../../types/User";
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../configuration";
import Header from "../../componenets/Header/Header";
import Loading from "../../componenets/Loading/Loading";

interface ExercisesProps {
  id: string;
  bodyPart: string;
  exercises: { name: string; status: string }[];
}

const Admin = () => {
  const [admin, setAdmin] = useState<User>();
  const [exerciseName, setExerciseName] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState<ExercisesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storeData = localStorage.getItem("currentUser");
    if (storeData) {
      setAdmin(JSON.parse(storeData));
    }
    fetchExercises();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBodyPart(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!exerciseName) {
      setError("Exercise name is required!");
      return;
    }

    if (!selectedBodyPart || selectedBodyPart === "none") {
      setError("Please select a valid body part!");
      return;
    }
    setIsLoading(true);
    try {
      const workoutRef = collection(db, "workout");

      // Check if a document with the selected body part exists
      const q = query(workoutRef, where("bodyPart", "==", selectedBodyPart));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Body part exists, update the existing document
        const docRef = querySnapshot.docs[0].ref; // Get the first matching document

        await updateDoc(docRef, {
          exercises: arrayUnion({ name: exerciseName, status: "TODO" }), // Append new exercise
        });
      } else {
        // Body part doesn't exist, create a new document
        await addDoc(workoutRef, {
          bodyPart: selectedBodyPart,
          exercises: [{ name: exerciseName, status: "TODO" }],
          createdAt: new Date(),
        });
      }

      setExerciseName("");
      setSelectedBodyPart("");
      setError("");

      fetchExercises(); // Refresh exercises list after adding
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding exercise: ", error);
      setError("There was an error adding the exercise.");
    }
  };

  const fetchExercises = async () => {
    setIsLoading(true);
    try {
      const dataExercises = collection(db, "workout");
      const snapshot = await getDocs(dataExercises);

      const exercisesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        bodyPart: doc.data().bodyPart,
        exercises: doc.data().exercises || [],
      }));

      setExercises(exercisesData);
    } catch (error) {
      console.error(`Error fetching exercises: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(exercises);

  return (
    <>
      <Header />
      <section className="admin h-lvh">
        <h1>
          Admin, {admin?.firstName} {admin?.lastName}
        </h1>
        <div className="chart">
          <DoughnutChart />
        </div>
        <div className="flex flex-col md:flex-row md:justify-around pt-20 pb-16 ml-2 mr-2">
          <div className="add_exercise md:w-64">
            <h2 className="text-center">Add New Exerises</h2>
            <form onSubmit={handleSubmit} className="text-center">
              <select
                value={selectedBodyPart}
                onChange={handleSelectChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-8"
              >
                <option>None</option>
                <option value="abs">abs</option>
                <option value="legs">legs</option>
                <option value="back">back</option>
                <option value="chest">chest</option>
                <option value="shoulder">shoulder</option>
                <option value="calf">calf</option>
                <option value="hamstring">hamstring</option>
                <option value="arm">arm</option>
                <option value="biceps">biceps</option>
                <option value="glutes">glutes</option>
                <option value="quadriceps">quadriceps</option>
                <option value="forearm">forearm</option>
                <option value="triceps">triceps</option>
                <option value="abdominals">abdominals</option>
                <option value="core">core</option>
              </select>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-8"
                value={exerciseName}
                onChange={handleChange}
                placeholder="Exercise Name"
              />
              <button
                type="submit"
                className="text-white bg-gradient-to-r bg-blue-500 hover:bg-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-8"
              >
                Add Exercise
              </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="exercise-list pt-20 md:pt-0 md:40">
            <h2 className="text-center">LIST OF EXERCISES</h2>
            <div className="flex flex-row w-full flex-wrap justify-between mt-5 md:justify-center">
              {isLoading ? (
                <div className="flex m-auto pt-7">
                <Loading color="fill-blue-600" />
                </div>
              ) : exercises.length === 0 ? (
                <p>No exercises available.</p>
              ) : (
                exercises.map((exerciseDoc) => (
                  <div key={exerciseDoc.id} className="mt-5 mr-10 ml-10">
                    <h4>{exerciseDoc.bodyPart.toUpperCase()}</h4>
                    <ul>
                      {exerciseDoc.exercises &&
                      exerciseDoc.exercises.length > 0 ? (
                        exerciseDoc.exercises.map((exercise, index) => (
                          <li key={index}>
                            <span>{exercise.name}</span>
                          </li>
                        ))
                      ) : (
                        <li>No exercises added yet.</li>
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Admin;
