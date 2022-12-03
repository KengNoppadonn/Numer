import React from "react";
import { useState } from "react"
import { compile } from "mathjs";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export const Graphical = () => {
  const [XL, SetXl] = useState();
  const [Equation, SetEQ] = useState("")
  const [All, setAll] = useState([{ iteration: [], re: [] }]);
  const [ans, setans] = useState([{ iteration: [], xy: [] }])
  const [io, setio] = useState()


  function calculate() {
    var xl = Number(XL);
    var xm;
    var fm;
    var errer = 1;
    var compxr;
    var ff;
    var i = 1;
    var arr = []
    var result = []

    while (i < xl) {
      let scope_xr = { x: i }
      compxr = compile(Equation)
      ff = compxr.evaluate(scope_xr)

      arr.push({ iteration: i.toFixed(2), re: ff })

      if (ff == 0) {
        result.push({ iteration: i.toFixed(2), xy: ff })
        console.log(ff)
      }
      i += 0.001

    }
    console.log(result)
    setans(result)
    setAll(arr)



  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = All.map((e) => { return e.iteration });


  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: All.map((e) => { return e.re }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };




  return (
    <div>
      <center>
        <h1>Graphical Method</h1>
        <p><input placeholder="Equation" value={Equation} onChange={e => SetEQ(e.target.value)} /></p>
        <p><input placeholder="XL" value={XL} onChange={e => SetXl(e.target.value)} /></p>
        <button onClick={e => calculate()}>result </button>
        <p>{Equation}</p>
        <p>{XL}</p>
        <p>{ans.map((e) => { return e.iteration, e.xy })}</p>

      </center>
      <Line options={options} data={data} />;

    </div>
  )
}