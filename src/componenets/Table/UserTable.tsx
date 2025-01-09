import { useState } from "react";
import { User } from "../../types/User";

interface UserTableProps {
  users: User[];
  handleViewUser: (user: User) => void;
  toggleModalExercis: () => void;
  toggleModalDelete: () => void;
}

const UserTable = ({
  users,
  handleViewUser,
  toggleModalExercis,
  toggleModalDelete,
}: UserTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (userId: string) => {
    setOpenMenuId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div className="overflow-x-auto mt-4 px-2">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Birth Date</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Group</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">
                {user.firstName}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.lastName}
              </td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.birthDate}
              </td>
              <td className="py-2 px-4 border-b text-center">{user.gender}</td>
              <td className="py-2 px-4 border-b text-center">{user.group}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => toggleMenu(user.id)} className="text-xl">
                  ⋮
                </button>
                {openMenuId && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      View
                    </button>
                    <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Edit
                    </p>
                    <button
                      onClick={() => {
                        toggleModalExercis();
                        setOpenMenuId(null);
                      }}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Add Exercise
                    </button>
                    <button
                      onClick={() => {
                        toggleModalDelete();
                        setOpenMenuId(null);
                      }}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
              {users.length === 0 && (
                <td colSpan={7} className="text-center">
                  No DATA
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
