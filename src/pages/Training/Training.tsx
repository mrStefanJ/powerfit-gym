import imageCardio from "../../assets/cardio-exercises.jpg";
import imageHiit from "../../assets/hiit-exercises.jpeg";
import imagePilates from "../../assets/pilates-exercises.jpg";
import imageStraing from "../../assets/strength-exercises.jpg";
import imageYoga from "../../assets/yoga-exercises.jpg";
import TrainingCard from "../../componenets/Card/TrainingCard";
import Footer from "../../componenets/Footer/Footer";
import Header from "../../componenets/Header/Header";

const trainings = [
  {
    id: 1,
    name: "Strength Training",
    level: "Intermediate",
    image: imageStraing,
  },
  { id: 2, name: "Cardio Blast", level: "Beginner", image: imageCardio },
  { id: 3, name: "HIIT", level: "Advanced", image: imageHiit },
  { id: 4, name: "Yoga", level: "All Levels", image: imageYoga },
  { id: 5, name: "Pilates", level: "Intermediate", image: imagePilates },
];

const Training = () => {
  const filteredTrainings = trainings.filter(
    (training) => training.name.toLowerCase() !== "scumbags"
  );

  return (
    <>
      <Header />
      <section className="training">
        <div className="text-center font-sans">
          <div className="bg-gray-800 text-white py-8">
            <h1 className="text-4xl font-bold">Training Programs</h1>
            <p className="text-lg mt-2">
              Explore our diverse training sessions
            </p>
          </div>

          <div className="flex flex-col items-center py-16">
            <h1 className="text-3xl font-semibold mb-6">Available Trainings</h1>
            {filteredTrainings.map((training) => (
              <div key={training.id} className="text-xl py-2 mx-4 max-w-full md:w-[600px]">
                <TrainingCard
                  image={training.image}
                  alt={training.name}
                  name={training.name}
                  level={training.level}
                  index={training.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Training;
