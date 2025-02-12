import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserCard from "../../componenets/Card/UserCard";
import Footer from "../../componenets/Footer/Footer";
import Header from "../../componenets/Header/Header";
import Loading from "../../componenets/Loading/Loading";
import { db } from "../../configuration";
import { User } from "../../types/User";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleViewUser = (userId: string) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Header />
      <section className="user h-dvh">
        {loading ? (
          <Loading color="fill-blue-600" />
        ) : (
          <ul className="flex flex-row gap-4 m-4">
            {users.map((user: User) => (
              <li key={user.id}>
                <UserCard
                  image={user.image ?? "default-image"}
                  firstName={user.firstName ?? "Unknown"}
                  lastName={user.lastName ?? ""}
                  onClick={() => handleViewUser(user.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Users;
