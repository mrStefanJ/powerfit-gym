import { useState } from "react";
import { User } from "../../types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";

interface UserTableProps {
  users: User[];
  handleViewUser: (user: User) => void;
  toggleModalExercis: (id: string) => void;
  toggleModalEdit: (id: string) => void;
  toggleModalDelete: (userId: string) => void;
}

const UserTable = ({
  users,
  handleViewUser,
  toggleModalExercis,
  toggleModalEdit,
  toggleModalDelete,
}: UserTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (userId: string) => {
    setOpenMenuId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div className="overflow-x-auto mt-8 mb-80 px-2">
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
                <button onClick={() => toggleMenu(user.id)} className="text-xl hover:bg-gray-200 w-[26px] h-[28px]">
                  ⋮
                </button>
                {openMenuId === user.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg flex flex-col">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex flex-row justify-between items-center"
                    >
                      View <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      onClick={() => {
                        toggleModalEdit(user.id);
                        setOpenMenuId(null);
                      }}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex flex-row justify-between items-center"
                    >
                      Edit User <FontAwesomeIcon icon={faUserPen} />
                    </button>
                    <button
                      onClick={() => {
                        toggleModalExercis(user.id);
                        setOpenMenuId(null);
                      }}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex flex-row justify-between items-center"
                    >
                      Add Exercise <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      onClick={() => {
                        toggleModalDelete(user.id);
                        setOpenMenuId(null);
                      }}
                      className="px-4 py-2 hover:bg-gray-200 hover:text-red-500 cursor-pointer flex flex-row justify-between items-center"
                    >
                      Delete <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          <tr>
            {users.length === 0 && (
              <td colSpan={7} className="text-center">
                No DATA
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
