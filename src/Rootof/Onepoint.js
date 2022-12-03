import { i, number } from "mathjs";
import React, { useState } from "react";
import { compile } from "mathjs";
import Button from 'react-bootstrap/Button';
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

export const Onepoint = () => {
  const [xx, setx] = useState()
  const [Equation, setequation] = useState("")
  const [All, setall] = useState([{ iteration: [], x: [], errer: [] }])
  const cal = () => {

    var x = Number(xx);
    console.log(x)
    var xo = x;
    var errer = 1;
    var compx;
    var i = 1;
    var arr = []
    var x1 = x;
    do {
      xo = x1;
      let scope_x = { x: x1 }
      compx = compile(Equation)
      x1 = compx.evaluate(scope_x)
      console.log(xo, x1)
      errer = Math.abs((x1 - xo) / x1) * 100
      arr.push({ iteration: i, x: x1, errer: errer })
      i++
    } while (errer >= 0.00001)
    setall(arr)
    //  console.log(i)

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

  //   console.log(labels)
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: All.map((e) => { return e.x }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };





  return (
    <div>
      <center>
        <h1>Onepoint Iteration </h1>
        <p><input placeholder="Equation" value={Equation} onChange={e => setequation(e.target.value)} /></p>
        <p><input placeholder="Input X" value={xx} onChange={e => setx(e.target.value)} /></p>
        <Button onClick={e => cal()}>result </Button>
        <p>{Equation}</p>
        <p>{xx}</p>
        <Line options={options} data={data} />;
      </center>
    </div>
  )
}