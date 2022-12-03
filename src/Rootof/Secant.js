import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
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

export const Secant = () => {
  const [x0, setx0] = useState()
  const [x1, setx1] = useState()
  const [Equation, setEquation] = useState()
  const [All, setAll] = useState([{ iteration: [], X: [] }])
  const cal = () => {
    var xo = Number(x0)
    var xn = Number(x1)
    var scope_xo

    var fxo
    var scope_xn
    var compfx
    var fxn, XN, errer
    compfx = compile(Equation)
    var i = 0;
    var arr = []
    do {
      scope_xn = { x: xn }
      fxn = compfx.evaluate(scope_xn)
      scope_xo = { x: xo }
      fxo = compfx.evaluate(scope_xo)

      XN = xn - ((fxn * (xo - xn)) / (fxo - fxn))
      errer = Math.abs((XN - xo) / XN) * 100
      xo = xn
      xn = XN

      arr.push({ iteration: i, X: XN.toFixed(6) })
      i++
    } while (errer >= 0.000001)
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
        data: All.map((e) => { return e.X }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };




  return (
    <div>
      <center>
        <h1>Secant Method </h1>
        <p><input placeholder="Equation" value={Equation} onChange={e => setEquation(e.target.value)} /></p>
        <p><input placeholder="Input X0" value={x0} onChange={e => setx0(e.target.value)} /></p>
        <p><input placeholder="Input X1" value={x1} onChange={e => setx1(e.target.value)} /></p>
        <Button onClick={e => cal()}>result </Button>
        <p>{Equation}</p>
        <p>{x0}</p>
        <p>{x1}</p>
      </center>
      <Line options={options} data={data} />;
    </div>
  )
}