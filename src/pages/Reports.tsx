import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import _ from "underscore";

import { Transaction } from "../interfaces";

const Reports = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const transactions: Transaction[] = JSON.parse(
    localStorage.getItem("transactions") || ""
  );

  const groupByCategory = Object.entries(
    _.groupBy(transactions, (el) => el.category)
  );

  let data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#EF4444", "#06B6D4", "#22C55E"],
      },
    ],
  };

  groupByCategory.forEach((item) => {
    let totalPrice = 0;
    item[1].forEach((transaction) => (totalPrice += Number(transaction.price)));
    // @ts-ignore
    data.labels.push(item[0]);
    // @ts-ignore
    data.datasets[0].data.push(totalPrice);
  });

  return (
    <div>
      <div className="flex gap-x-4 justify-center overflow-x-scroll mb-8 bg-gray-500 text-white px-4 py-2">
        {[
          // "April",
          // "May",
          // "June",
          // "July",
          // "August",
          // "September",
          // "Prev Month",
          // "This Month",
          "Total",
        ].map((item, index) => (
          <p
            className={`${
              index === 0 ? "border-b-2 border-white " : ""
            }whitespace-nowrap`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="max-w-xs mx-auto">
        <Doughnut data={data} />
      </div>
      <hr className="my-8" />
      {data.labels.map((label, index) => (
        <div
          key={index}
          className="flex justify-between max-w-xs mx-auto mb-2"
          style={{ color: data.datasets[0].backgroundColor[index] }}
        >
          <p>{label}</p>
          <p>${data.datasets[0].data[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default Reports;
