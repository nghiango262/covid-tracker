import React, { useEffect, useState } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";

const buildDataChart = (data) => {
  const labels = [];
  const dats = [];
  let lastPoint;
  for (const [key, value] of Object.entries(data)) {
    
    
    if (lastPoint) {
      labels.push(key);
      dats.push(value - lastPoint);
    }
    
    lastPoint = value;
  }
  return {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dats,
      },
    ],
  };
};

function LineGraph() {
  const [data, setData] = useState(null);
  useEffect(() => {
    //
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          setData(buildDataChart(data.cases)) 
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);
  return (
    <div className="lineGraph">
      
      {data && <Line data={data} />}
    </div>
  );
}

export default LineGraph;
