import { DragEndEvent } from "@dnd-kit/core";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../../componenets/Footer/Footer";
import Header from "../../componenets/Header/Header";
import Loading from "../../componenets/Loading/Loading";
import UserTable from "../../componenets/Table/UserTable";
import { db } from "../../configuration";
import { listExercis } from "../../exercis/ExercisList";
import AddExercises from "../../modal/AddExercises";
import CreateUser from "../../modal/CreateUser";
import DeleteUser from "../../modal/DeleteUser";
import { Category, Exercise } from "../../types/Exercis";
import { User } from "../../types/User";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [exercis, setExercis] = useState(listExercis);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalExercises, setOpenModalExercises] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [message, setMessage] = useState("");
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    image: "",
    gender: "",
    group: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getDocs(collection(db, "users"));
      const userLists = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setUsers(userLists);
    } catch (error) {
      console.error(
        `There was an error fetching the data in firestore: ${error}`
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleModalAddUser = () => setOpenModal(!openModal);
  const toggleModalAddExercis = () =>
    setOpenModalExercises(!openModalExercises);
  const toggleModalDeleteUser = (id: string | null = null) => {
    setUserToDelete(id);
    setOpenModalDelete(!openModalDelete);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  // Save user data to Firestore
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        birthDate: userData.birthDate,
        image: userData.image,
        gender: userData.gender,
        group: userData.group,
      });
      console.log("Document written with ID: ", docRef.id);
      const newUser = { ...userData, id: docRef.id };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setOpenModal(false);

      setUserData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthDate: "",
        image: "",
        gender: "",
        group: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleViewUser = (user: User) => {
    if (!user.id) {
      console.error("User ID is missing");
      return;
    }
    navigate(`/user/${user.id}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedItemId = active.id as string;
    const targetStatus = over.id as Exercise["status"];

    setExercis((prevExercis) =>
      prevExercis.map((category) => {
        const updatedWorkout = category.exercises.workout.map((exercise) => {
          if (exercise.id === parseInt(draggedItemId)) {
            return { ...exercise, status: targetStatus };
          }
          return exercise;
        });

        return {
          ...category,
          exercises: {
            ...category.exercises,
            workout: updatedWorkout,
          },
        };
      })
    );
  };

  const handleSubmitExercises = () => {
    const newDate = new Date();
    const formattedToday = newDate.toISOString().split("T")[0];

    const existingData = localStorage.getItem("exercises");
    // Checking for user if he/she finished exercises for today
    if (existingData) {
      const parseData = JSON.parse(existingData);

      const saveData = parseData.date.split("T")[0];
      if (saveData === formattedToday) {
        setMessage("You already finished for today, see you tomorrow");
        return;
      }
    }

    const exerciseToSave = exercis
      .filter(
        (category: Category) => category.exercises.title === selectedCategory
      )
      .map((category: Category) => ({
        id: category.exercises.id,
        title: category.exercises.title,
        workout: category.exercises.workout.filter(
          (exercise) => exercise.status !== "TODO"
        ),
      }));

    const saveExercis = {
      exercis: exerciseToSave,
      date: newDate.toISOString(),
    };

    localStorage.setItem("exercises", JSON.stringify(saveExercis));
    toggleModalAddUser();
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const deleteUser = doc(db, "users", id);
      await deleteDoc(deleteUser);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setOpenModalDelete(false);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-row justify-between items-center mx-2.5 pt-3.5">
        <p>List of Users</p>
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
          onClick={toggleModalAddUser}
        >
          Add
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <UserTable
          users={users}
          handleViewUser={handleViewUser}
          toggleModalExercis={toggleModalAddExercis}
          toggleModalDelete={(id: string) => toggleModalDeleteUser(id)}
        />
      )}

      {openModal && (
        <CreateUser
          userData={userData}
          toggleModalUser={toggleModalAddUser}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      )}

      {openModalExercises && (
        <AddExercises
          exercis={exercis}
          handleDragEnd={handleDragEnd}
          message={message}
          toggleModalExercis={toggleModalAddExercis}
          saveExercises={handleSubmitExercises}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      )}
      {openModalDelete && userToDelete && (
        <DeleteUser
          toggleModalDelete={() => toggleModalDeleteUser(null)}
          handleDeleteUser={() => handleDeleteUser(userToDelete)}
        />
      )}
      <Footer />
    </>
  );
};

export default Users;
