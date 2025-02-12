interface UserCardProps {
  image: string;
  firstName: string;
  lastName: string;
  onClick: () => void;
}

const UserCard = ({ image, firstName, lastName, onClick }: UserCardProps) => {
  return (
    <div className="card relative w-56 h-56 group" onClick={onClick}>
      <img src={image} alt={firstName} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:cursor-pointer transition-opacity duration-300">
        <p className="text-white text-lg font-semibold">
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
