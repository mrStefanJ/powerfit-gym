import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { db } from "../../firebase/configuration";
import { User } from "../../types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faPersonDress } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => doc.data() as User);

      const males = users.filter((user) => user.gender === "Male").length;
      const females = users.filter((user) => user.gender === "Female").length;

      setMaleCount(males);
      setFemaleCount(females);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Doughnut chart data
  const data = {
    labels: [],
    datasets: [
      {
        label: "User Count",
        data: [maleCount, femaleCount],
        backgroundColor: ["#3498db", "#e74c3c"], // Blue for males, Red for females
        hoverBackgroundColor: ["#2980b9", "#c0392b"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="relative w-[300px] m-auto">
      {isLoading ? (
        <div className="flex m-auto pt-40 pl-32">
        <Loading color="fill-blue-600" />
        </div>
      ) : (
        <>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faPerson}
              className="size-11 text-[#3498db]"
            />
            <FontAwesomeIcon
              icon={faPersonDress}
              className="size-11 text-[#e74c3c]"
            />
          </div>
          <div className="text-center text-lg">
            <span className="font-bold text-[#3498db]">{maleCount}</span>/
            <span className="font-bold text-[#e74c3c]">{femaleCount}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DoughnutChart;
