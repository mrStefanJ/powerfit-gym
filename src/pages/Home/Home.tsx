import Header from "../../componenets/Header/Header";
import Footer from "../../componenets/Footer/Footer";

const Home = () => {
  //   const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <section className="home">
        <div className="welcome-page">
          <div className="bg-gray-800 text-white py-8">
            <h1 className="text-4xl font-bold">Welcome to PowerFit Gym</h1>
            <p className="text-lg mt-2">Your journey to fitness starts here</p>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="/images/gym-hero.jpg"
              alt="Gym workout"
              className="w-4/5 rounded-lg mb-8"
            />
            <div className="text-center">
              <h2 className="text-3xl font-semibold">
                Train Hard, Stay Strong
              </h2>
              <p className="text-lg mt-4">
                Join our community and transform your life today!
              </p>
              {/* <button className="bg-red-500 text-white px-8 py-4 mt-6 text-xl rounded-lg hover:bg-red-600 transition">Get Started</button> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
