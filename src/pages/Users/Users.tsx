import { DragEndEvent } from "@dnd-kit/core";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useId,
  useState
} from "react";
import { useNavigate } from "react-router";
import Footer from "../../componenets/Footer/Footer";
import Header from "../../componenets/Header/Header";
import UserTable from "../../componenets/Table/UserTable";
import AddExercises from "../../modal/AddExercises";
import CreateUser from "../../modal/CreateUser";
import DeleteUser from "../../modal/DeleteUser";
import { Category, Exercise } from "../../types/Exercis";
import { User } from "../../types/User";

const listExercis: Category[] = [
  {
    id: 111,
    exercises: {
      id: 1,
      title: "abs",
      workout: [
        { id: 101, title: "Crunch", status: "TODO" },
        { id: 102, title: "V-sit", status: "TODO" },
        { id: 103, title: "Cable crunch", status: "TODO" },
      ],
    },
  },
  {
    id: 112,
    exercises: {
      id: 2,
      title: "legs",
      workout: [
        { id: 201, title: "Split squats", status: "TODO" },
        { id: 202, title: "Walking lunges", status: "TODO" },
        { id: 203, title: "Squat", status: "TODO" },
      ],
    },
  },
  {
    id: 113,
    exercises: {
      id: 3,
      title: "lowerBack",
      workout: [
        { id: 301, title: "Knee to chest stretch", status: "TODO" },
        { id: 302, title: "Superman", status: "TODO" },
        { id: 303, title: "Plank", status: "TODO" },
      ],
    },
  },
  {
    id: 114,
    exercises: {
      id: 4,
      title: "shoulder",
      workout: [
        { id: 401, title: "Front raise", status: "TODO" },
        { id: 402, title: "Y raise", status: "TODO" },
        { id: 403, title: "Push press", status: "TODO" },
      ],
    },
  },
];

const Users = () => {
  const [exercis, setExercis] = useState(listExercis);
  const [openModal, setOpenModal] = useState(false);
  const [openModalExercises, setOpenModalExercises] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState<User>({
    id: useId(),
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
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const toggleModalUser = () => setOpenModal(!openModal);
  const toggleModalExercis = () => setOpenModalExercises(!openModalExercises);
  const toggleModalDelete = () => setOpenModalDelete(!openModalDelete);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUsers = [...users, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
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
  };

  const handleViewUser = (user: User) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    navigate("/user", { state: { user } });
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

    if (existingData) {
      const parseData = JSON.parse(existingData);

      const saveData = parseData.date.split("T")[0];
      if (saveData === formattedToday) {
        setMessage("You already finished for today, see you tomorrow")
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

    console.log(saveExercis);
    localStorage.setItem("exercises", JSON.stringify(saveExercis));
    toggleModalExercis();
  };

  return (
    <>
      <Header />
      <div className="flex flex-row justify-between items-center mx-2.5 pt-3.5">
        <p>List of Users</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={toggleModalUser}
        >
          Add
        </button>
      </div>
      <UserTable
        users={users}
        handleViewUser={handleViewUser}
        toggleModalExercis={toggleModalExercis}
        toggleModalDelete={toggleModalDelete}
      />

      {openModal && (
        <CreateUser
          userData={setUserData}
          toggleModalUser={toggleModalUser}
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
          toggleModalExercis={toggleModalExercis}
          saveExercises={handleSubmitExercises}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      )}
      {openModalDelete && (
        <DeleteUser toggleModalDelete={toggleModalDelete} />
        )}
      <Footer />
    </>
  );
};

export default Users;
