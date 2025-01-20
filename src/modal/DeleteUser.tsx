import Loading from "../componenets/Loading/Loading";

interface DeleteProps {
  toggleModalDelete: () => void;
  loading: boolean;
  handleDelete: () => void;
}

const DeleteUser = ({ toggleModalDelete, loading, handleDelete }: DeleteProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-11/12">
        <h1 className="text-center text-xl">
          Are you sure, you want to delete User?
        </h1>
        <div className="text-center h-20 pt-8">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            onClick={toggleModalDelete}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
            onClick={handleDelete}
          >
            {loading ? <Loading color="fill-white" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
