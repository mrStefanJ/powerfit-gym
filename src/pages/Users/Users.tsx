import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../../componenets/Footer/Footer";
import Header from "../../componenets/Header/Header";
import Loading from "../../componenets/Loading/Loading";
import UserTable from "../../componenets/Table/UserTable";
import { db } from "../../configuration";
import AddExercises from "../../modal/AddExercises";
import DeleteUser from "../../modal/DeleteUser";
import ModalUser from "../../modal/ModalUser";
import { Category } from "../../types/Exercis";
import { User } from "../../types/User";
import { listExercis } from "../../exercis/ExercisList";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [exercis, setExercis] = useState(listExercis || []);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalExercises, setOpenModalExercises] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

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
  const toggleModalEditUser = (id: string | null = null) => {
    const defaultUser: User = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      image: "",
      gender: "",
      group: "",
    };

    const userToEdit = users.find((user) => user.id === id) || defaultUser;
    // Provide default values for optional fields
    setUserData({
      id: userToEdit.id || "",
      firstName: userToEdit.firstName || "",
      lastName: userToEdit.lastName || "",
      email: userToEdit.email || "",
      password: userToEdit.password || "",
      birthDate: userToEdit.birthDate || "",
      image: userToEdit.image || "",
      gender: userToEdit.gender || "",
      group: userToEdit.group || "",
    });
    setOpenModalEdit(!openModalEdit);
  };

  const toggleModalAddExercis = (id: string | null = null) => {
    setSelectedUser(id);
    setOpenModalExercises(!openModalExercises);
  };
  const toggleModalDeleteUser = (id: string | null = null) => {
    setSelectedUser(id);
    setOpenModalDelete(!openModalDelete);
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
    setLoading(true);
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

      setLoading(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Update User
  const handleEditUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Editing user");
    setLoading(true);
    try {
      if (!userData.id) return;

      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        birthDate: userData.birthDate,
        gender: userData.gender,
        group: userData.group,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userData.id ? { ...user, ...userData } : user
        )
      );

      setOpenModalEdit(false);
      setLoading(false);
    } catch (error) {
      console.log("Error updateing user: ", error);
    }
  };

  const handleViewUser = (user: User) => {
    if (!user.id) {
      console.error("User ID is missing");
      return;
    }
    navigate(`/user/${user.id}`);
  };

  const handleSubmitExercises = async () => {
    if (!selectedUser) {
      setMessage("No user selected for adding exercises.");
      return;
    }

    const newDate = new Date();
    const formattedToday = newDate.toISOString().split("T")[0];

    // Filter exercises by selected category and non-TODO status
    const exerciseToSave = exercis
      .filter((category) => category.exercises.title === selectedCategory)
      .map((category) => ({
        id: category.exercises.id,
        title: category.exercises.title,
        workout: category.exercises.workout.filter(
          (exercise) => exercise.status !== "TODO"
        ),
      }));

      console.log(exerciseToSave)

    try {
      // Reference to the user's document
      const userRef = doc(db, "users", selectedUser);

      // Fetch the current user's data
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setMessage("User does not exist in the database.");
        return;
      }

      const currentData = userDoc.data();

      // Get the current exercise array from Firestore
      const currentExercises = currentData?.exercis || [];

      // Update the workouts to add only unique ones
      const updatedWorkouts = exerciseToSave[0].workout.filter(
        (newEx) => !currentExercises.flatMap((ex: Category) => ex.exercises.workout).some((ex: any) => ex.id === newEx.id)
      );

      // If no new exercises, exit early
      // if (updatedWorkouts.length === 0) {
      //   setMessage("No new exercises to add.");
      //   return;
      // }

      // Create the updated array with the new exercises
      const updatedExercises = [
        ...currentExercises,
        {
          ...exerciseToSave[0],
          workout: updatedWorkouts,
          date: formattedToday,
        },
      ];

      // Update Firestore with the new exercises
      await updateDoc(userRef, { exercises: updatedExercises });

      setMessage("Exercises submitted successfully!");
      setOpenModalExercises(false);
    } catch (error) {
      console.error("Error saving exercises:", error);
      setMessage("An error occurred while saving exercises.");
    }
  };

  // Delete user
  const handleDeleteUser = async (id: string) => {
    setLoading(true);
    try {
      const deleteUser = doc(db, "users", id);
      await deleteDoc(deleteUser);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setOpenModalDelete(false);
      setLoading(false);
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
          className="bg-yellow-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-800 transition"
          onClick={toggleModalAddUser}
        >
          Add
        </button>
      </div>

      {loading ? (
        <Loading color="fill-blue-600" />
      ) : (
        <UserTable
          users={users}
          handleViewUser={handleViewUser}
          toggleModalExercis={(id: string) => toggleModalAddExercis(id)}
          toggleModalEdit={(id: string) => toggleModalEditUser(id)}
          toggleModalDelete={(id: string) => toggleModalDeleteUser(id)}
        />
      )}

      {openModal && (
        <ModalUser
          title="Add User"
          userData={userData}
          toggleModalUser={toggleModalAddUser}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      )}

      {openModalEdit && (
        <ModalUser
          title="Edit User"
          userData={userData}
          toggleModalUser={toggleModalEditUser}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          loading={loading}
          handleSubmit={handleEditUser}
        />
      )}

      {openModalExercises && (
        <AddExercises
          selectedUser={selectedUser}
          exercis={exercis}
          setExercis={setExercis}
          message={message}
          toggleModalExercis={toggleModalAddExercis}
          saveExercises={handleSubmitExercises}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {openModalDelete && selectedUser && (
        <DeleteUser
          toggleModalDelete={() => toggleModalDeleteUser(null)}
          loading={loading}
          handleDelete={() => handleDeleteUser(selectedUser)}
        />
      )}
      <Footer />
    </>
  );
};

export default Users;
