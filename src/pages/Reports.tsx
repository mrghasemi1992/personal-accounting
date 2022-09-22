import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import _ from "underscore";
import { Transaction } from "../interfaces";

const Reports = () => {
  const [state, setState] = useState({
    activeIndex: 0,
  });
  const transactions: Transaction[] = JSON.parse(
    localStorage.getItem("transactions") || ""
  );

  const groupByCategory = Object.entries(
    _.groupBy(transactions, (el) => el.category)
  );

  const data = groupByCategory.map((item) => {
    let totalPrice = 0;
    item[1].forEach((transaction) => (totalPrice += Number(transaction.price)));
    return { name: item[0], value: totalPrice };
  });

  return (
    <PieChart width={375} height={375} className="mx-auto">
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      />
    </PieChart>
  );
};

export default Reports;
