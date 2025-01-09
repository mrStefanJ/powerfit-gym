import Footer from "../../componenets/Footer/Footer";
import Header from "../../componenets/Header/Header";

const trainings = [
  { id: 1, name: "Strength Training", level: "Intermediate" },
  { id: 2, name: "Cardio Blast", level: "Beginner" },
  { id: 3, name: "HIIT", level: "Advanced" },
  { id: 4, name: "Yoga", level: "All Levels" },
  { id: 5, name: "Pilates", level: "Intermediate" },
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
          <p className="text-lg mt-2">Explore our diverse training sessions</p>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-semibold mb-6">Available Trainings</h2>
          <ul className="list-none">
            {filteredTrainings.map((training) => (
              <li key={training.id} className="text-xl py-2">
                {training.name} - {training.level}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Training;
