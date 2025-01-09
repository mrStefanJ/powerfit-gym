interface DeleteProps {
  toggleModalDelete: () => void;
}

const DeleteUser = ({ toggleModalDelete }: DeleteProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12">
        <h1 className="text-center text-xl">
          Are you sure, you want to delete User 'Name'
        </h1>
        <div className="button">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={toggleModalDelete}
          >
            Close
          </button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
