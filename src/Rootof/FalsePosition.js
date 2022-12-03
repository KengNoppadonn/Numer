import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
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

export const FalsePosition = () => {
  const [xL, setxl] = useState();
  const [xR, setxr] = useState();
  const [x1, setx1] = useState();
  const [Equation, setEquation] = useState("");
  const [All, setAll] = useState([{ iteration: [], collxR: [], collxL: [], collx1: [], collerr: [] }]);

  function cal() {
    var xl = Number(xL)
    var xl1 = Number(xL)
    var xr = Number(xR)
    var xo = 0;
    var i = 0;
    var fxl, fxr, x1, fx1
    var errer = 1;
    var arrAll = [{}];
    while (errer >= 0.00001) {
      xo = x1
      let scope_xr = { x: xr }
      const compxr = compile(Equation)
      fxr = compxr.evaluate(scope_xr)
      let scope_xl = { x: xl }
      const compxl = compile(Equation)
      fxl = compxr.evaluate(scope_xl)
      x1 = ((xl * fxr) - (xr * fxl)) / (fxr - fxl)

      let scope_x1 = { x: x1 }
      const compx1 = compile(Equation)
      console.log(x1)
      fx1 = compx1.evaluate(scope_x1)
      if (fxr * fx1 > 0) {
        xr = x1;
      }
      else {
        xl = x1;
      }

      errer = Math.abs((x1 - xo) / x1) * 100;
      i <= 0 ? arrAll = [{ collxR: xr.toFixed(6), collxL: xl1.toFixed(6), collx1: x1.toFixed(6), collerr: errer.toFixed(6) }] :
        arrAll.push({
          iteration: i, collxR: xr.toFixed(6), collxL: xl.toFixed(6), collx1: x1.toFixed(6), collerr: errer.toFixed(6)
        })
      i++;
    }
    setAll(arrAll);
    setx1(x1)


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
        data: All.map((e) => { return e.collx1 }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };

  return (
    <div >
      <center>
        <h1 >FalsePosition</h1>
        <p><input placeholder="Equation" value={Equation} onChange={e => setEquation(e.target.value)} /></p>
        <p><input placeholder="XL" value={xL} onChange={e => setxl(e.target.value)} /></p>
        <p><input placeholder="XR" value={xR} onChange={e => setxr(e.target.value)} /></p>
        <Button  onClick={e => cal()}>Result</Button>
      </center>
      <Table class="table table-dark" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">Iteration</th>
            <th scope="col">XR</th>
            <th scope="col">XL</th>
            <th scope="col">XM</th>
            <th scope="col">ERROR</th>
          </tr>
        </thead>

        <tbody>
          {All.map((item, i) =>
            <tr>
              <td>{i}</td>
              <td>{item.collxR}</td>
              <td>{item.collxL}</td>
              <td>{item.collx1}</td>
              <td>{item.collerr}</td>
            </tr>
          )
          }
        </tbody>
      </Table>
      <Line options={options} data={data} />;
    </div>

  )
}