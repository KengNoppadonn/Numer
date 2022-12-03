import React, { useState } from 'react'
import { compile } from "mathjs";
import { Chart } from 'chart.js';
import Table from 'react-bootstrap/Table';
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

export const Bisection = () => {
  const [xr, setxr] = useState();
  const [xl, setxl] = useState();
  const [err, seterr] = useState(0);
  const [xm, setxm] = useState(0);
  const [equation, setequation] = useState("");
  const [All, setAll] = useState([{ iteration: [], collxR: [], collxL: [], collxM: [], collerr: [] }]);
  const cal_result = () => {
    var xM = 0, xOld = 0, fxM = 0, fxR = 0, i = 0;
    var check = 1;
    var xL = Number(xl);
    var xR = Number(xr);
    var arrAll = [{}];
    while (check >= 0.000001) {
      xOld = xM
      xM = (xL + xR) / 2
      let scope_XM = { x: xM }
      const compxm = compile(equation)
      fxM = compxm.evaluate(scope_XM)
      let scope_XR = { x: xR }
      const compxr = compile(equation)
      fxR = compxr.evaluate(scope_XR);

      if (fxM * fxR > 0) {
        xR = xM;
      }
      else if (fxM * fxR < 0) {
        xL = xM;
      }
      check = Math.abs((xM - xOld) / xM) * 100;
      i <= 0 ? arrAll = [{ iteration: i,collxR: xR.toFixed(6), collxL: xL.toFixed(6), collxM: xM.toFixed(6), collerr: check.toFixed(6) }] :
        arrAll.push({
          iteration: i, collxR: xR.toFixed(6), collxL: xL.toFixed(6), collxM: xM.toFixed(6), collerr: check.toFixed(6)
        })
      i++;


    }
    setAll(arrAll);
    setxm(xM)




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
        data: All.map((e) => { return e.collxL }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };
  return (

    <div variant="dark">

      <center><h1 style={{ color: "dark" }} >Bisection Method</h1>
        <h2 style={{ color: "dark" }}><input placeholder="Input Equation" type="text" value={equation} onChange={e => setequation(e.target.value)} /></h2>
        <h2 style={{ color: "dark" }}><input placeholder="Input XL" type="number" value={xl} onChange={e => setxl(e.target.value)} /></h2>
        <h2 style={{ color: "dark" }}><input placeholder="Input XR" type="number" value={xr} onChange={e => setxr(e.target.value)} /></h2><br />
        <Button variant="dark" onClick={e => cal_result()}> Result</Button><br /><br />

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
          {All.map((item) =>
            <tr>
              <td>{item.iteration}</td>
              <td>{item.collxR}</td>
              <td>{item.collxL}</td>
              <td>{item.collxM}</td>
              <td>{item.collerr}</td>
            </tr>
          )
          }
        </tbody>
      </Table>
      <Line options={options} data={data} />;






    </div>







  );
}
