import { type } from '@testing-library/user-event/dist/type';
import { sum, det, size, concat } from 'mathjs';
import React, { useState } from 'react'
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

export const MultiRegression = () => {
    var num = 0;
    const [val_x, Setval_x] = useState([])//kb
    const [val_y, Setval_y] = useState([])//kb
    const [array_cal, setCalArrA] = useState([]);
    const [array_Delta, setDelta] = useState([]);
    const [Order, SetOrder] = useState(0)
    const [Chart,SetChart]=useState({X:[],Y:[],fx:[]})


    const changeNum = (e) => {
        num = Number(e.target.value)
    }




    const creatMatrix = (event, num) => {
        //console.log(event.target.value)
        var loop = Number(type)
        // console.log(loop)
        // if (Number(event.target.value) >= 1) {
        var a = []
        var b = []
        for (var i = 0; i < Number(event.target.value); i++) {
            a[i] = []
            for (var j = 0; j < num; j++) {
                a[i][j] = 0
            }
        }
        for (var i = 0; i < num; i++) {
            b[i] = 0
        }
        Setval_x(a)
        Setval_y(b)
        // }
        // else {
        //     var a = []
        //     var b = []
        //     Setval_x(a)
        //     Setval_y(b)
        // }
    }


    const SetMatrix_X = (event, i, j) => {
        val_x[i][j] = parseFloat(event.target.value)
        // console.log(val_x)
    }

    const SetMatrix_Y = (event, i) => {
        val_y[i] = parseFloat(event.target.value)
    }

    //linear
    const callinear = () => {
        // var Testpow=Math.pow(5,1)
        // console.log("Pow"+Testpow)
        console.log("linear")
        var matrix_x = val_x
        var matrix_y = val_y
        var SaveMat_x = []
        var SaveMat_y = []
        var Sumpow2 = 0
        for (var i = 0; i < val_x.length + 1; i++) {
            SaveMat_x[i] = []
            for (var j = 0; j < val_x.length + 1; j++) {
                SaveMat_x[i][j] = 0
                SaveMat_y[i] = 0
            }
        }

        console.log(val_x[0])
        for (var i = 0; i < 2; i++) {

            if (i == 0) {

                SaveMat_x[0][0] = val_x[0].length

            }
            else {
                SaveMat_x[0][1] = sum(val_x[0])
                SaveMat_x[1][0] = sum(val_x[0])
            }
        }
        var Sumpow2 = 0
        for (var i = 0; i < val_x[0].length; i++) {
            Sumpow2 += Math.pow(val_x[0][i], 2)
            console.log(Sumpow2)
        }
        SaveMat_x[1][1] = Sumpow2
        console.log(SaveMat_x)
        SaveMat_y[0] = sum(val_y)
        Sumpow2 = 0
        for (var i = 0; i < val_x[0].length; i++) {
            Sumpow2 += val_x[0][i] * val_y[i]
        }
        SaveMat_y[1] = Sumpow2
        console.log(SaveMat_y)

        cal_Ans(SaveMat_x, SaveMat_y)

    }

    //poly
    const calpoly = () => {

        var matrix_x = val_x
        var matrix_y = val_y
        var xx=concat(...matrix_x)
        
        SetChart({X:xx,Y:matrix_y})
        
        var Size = Number(Order)
        var SaveMat_x = []
        var SaveMat_y = []
        var Range = val_x[0].length
        //console.log(Size)
        var Sumpow2 = 0
        for (var i = 0; i < Size + 1; i++) {
            SaveMat_x[i] = []
            for (var j = 0; j < Size + 1; j++) {
                SaveMat_x[i][j] = 0
                SaveMat_y[i] = 0
            }
        }

       // console.log(SaveMat_x)
        //console.log(Range)
        for (var i = 0; i < Size + 1; i++) {
            for (var j = 0; j < Size + 1; j++) {
                if (i == 0 && j == 0) {
                    SaveMat_x[0][0] = val_x[0].length
                }
                else {
                    var Sum = 0
                    for (var k = 0; k < val_x[0].length; k++) {
                        Sum += Math.pow(val_x[0][k], i + j)
                    }
                    SaveMat_x[i][j] = Sum;
                }

            }

        }
        var SumY = 0

        for (var i = 0; i < Size+1; i++) {
            SumY=0
            for (var j = 0; j < val_y.length; j++) {
               // console.log("y" + val_y[i])
                SumY += val_y[j] * Math.pow(val_x[0][j], i)
            } 
            SaveMat_y[i]=SumY
            //console.log("Sum" + SumY)

        }

        //console.log(SaveMat_x)
        //console.log(SaveMat_y)
        cal_Ans(SaveMat_x,SaveMat_y)
        var sum;
        var oo=[]
        var lll=array_cal
        var rrr=val_x
       for(var i=0;i<xx.length;i++){
        sum=0;
            for(var j=0;j<array_cal.length;j++){
                sum+=lll[j]*Math.pow(xx[i],j)
                console.log(xx[i])
            }
            oo.push(sum)
       }
       console.log("XX"+xx)
       console.log("Y:"+matrix_y)
       console.log("oo:"+oo)
        SetChart({X:xx,Y:matrix_y,fx:oo})
    }




    const SetMatrix = () => {
        console.log(val_x)
        console.log(val_y)
        var matrix_x = val_x
        var matrix_y = val_y
        var SaveMat_x = []
        var SaveMat_y = []
        var Sumpow2 = 0

        for (var i = 0; i < val_x.length + 1; i++) {
            SaveMat_x[i] = []
            for (var j = 0; j < val_x.length + 1; j++) {
                SaveMat_x[i][j] = 0
                SaveMat_y[i] = 0
            }
        }
        //L
        for (var i = 0; i < val_x.length + 1; i++) {
            if (i == 0) {
                SaveMat_x[0][0] = val_x[i].length
                SaveMat_y[i] = sum(val_y)
            }
            else {
                var ans_y = 0
                ans_y = cal_matrix(val_x[i - 1], val_y)
                let Sum = sum(val_x[i - 1])
                SaveMat_x[0][i] = Sum
                SaveMat_x[i][0] = Sum
                SaveMat_y[i] = ans_y
                // console.log(sum)


            }


        }
        // console.log(SaveMat_x)
        // SaveMat_x(SaveMat_x)
        // SaveMat_y(SaveMat_y)

        for (var i = 1; i < val_x.length + 1; i++) {
            for (var j = 1; j < val_x.length + 1; j++) {
                if (i == j) {
                    Sumpow2 = 0;
                    for (var k = 0; k < val_x[1].length; k++) {
                        Sumpow2 += Math.pow(val_x[i - 1][k], 2);
                    }
                    //console.log(Sumpow2)
                    SaveMat_x[i][j] = Sumpow2;
                }
                else {
                    SaveMat_x[i][j] = cal_matrix(val_x[i - 1], val_x[j - 1])

                }
            }
        }
        console.log(SaveMat_x)
        console.log(SaveMat_y)

        cal_Ans(SaveMat_x, SaveMat_y)
    }

    const cal_matrix = (v_x, v_y) => {
        // console.log(v_x)
        var size = v_x.length//array
        // console.log(size);
        var array = [size]
        var ansB = 0
        //console.log(v_y);
        for (var i = 0; i < size; i++) {
            array[i] = 0 //[0,0,0,0,0,0,0]
        }
        for (var i = 0; i < size; i++) {
            // console.log(array[i]);
            //[0,1,2] [2,4,0]
            ansB = v_x[i] * v_y[i]
            array[i] = ansB //[0,4,0]
            // console.log(array)

        }
        ansB = sum(array)
        // console.log("Ans= ", ansB);
        return ansB
    }

    const cal_Ans = (s_matrixA, s_matrixB) => {
        var matrixA = s_matrixA
        var matrixB = s_matrixB
        var size_matrix = 0
        var arrayAns = []
        var determinant = []
        
        determinant.push(Math.round(det(matrixA)))
        while (size_matrix != matrixA.length) {
            var transMatrix = copyMat(matrixA)
            //var transMatrix=matrixA
            // console.log("------------------"+matrixA.length)
            // console.log("++++++++++++++++++"+transMatrix.length)
            for (var i = 0; i < matrixA.length; i++) {//1
                for (var j = 0; j < matrixA.length; j++) {
                    if (j == size_matrix) {
                        transMatrix[i][j] = matrixB[i]
                        break;
                    }
                }
                // console.log(transMatrix);
            }
            arrayAns[size_matrix] = Math.round(det(transMatrix)) / Math.round(det(matrixA))
            determinant.push(Math.round(det(transMatrix)))
            // console.log(Delta);
            size_matrix++
        }
        //console.log(arrayAns);
        setCalArrA(arrayAns)
        setDelta(determinant)
    }


    const copyMat = (matrix) => {
        var array = []
        for (var i = 0; i < matrix.length; i++) {
            array[i] = [];
            for (var k = 0; k < matrix.length; k++) {
                array[i][k] = matrix[i][k];
            }
        }
        return array
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
    
      const labels = Chart.X;
    
    
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: Chart.Y,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: Chart.fx,
            borderColor: 'rgb(255, 255, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          
    
        ],
      };


    return (
        <div>
            <center>
                <h1>Regression Mix</h1>

                <p><input type="text" name="Point" onChange={changeNum} placeholder="X Size" /></p>
                <p><input type="text" onChange={event => creatMatrix(event, num)} placeholder="X Number" /></p>
                <p>Order for polynomial: <input placeholder='Order' onChange={e => SetOrder(e.target.value)} /></p>
                <p>{Order}</p>
                {val_x.map((Value_x, i) => (<div>
                    <tr>
                        <h4>x{i + 1}</h4>
                        {Value_x.map((Change_point, j) => (
                            <td>

                                <input onChange={event => SetMatrix_X(event, i, j)} />
                            </td>
                        ))}
                    </tr>
                </div>))}
                <p>y</p>
                {val_y.map((Value_y, i) => (<div>

                    <td><input onChange={event => SetMatrix_Y(event, i)} /></td>
                </div>))}
                <button onClick={callinear}>Calculate linear</button>
                <button onClick={calpoly}>Calculate polynomial</button>
                <button onClick={SetMatrix}>Calculate multi</button>


                <p>Answer This Multi-Regression with CramerRule</p>
                <br /><br />
                {array_cal.map((ans, i) => (
                    <h1>a{i + 1}= (delta{i + 1}/delta0  )=({array_Delta[i + 1]} /{array_Delta[0]} ) =   {ans.toFixed(6)}   </h1>

                ))}
                <p>{val_y.map((e)=>e)}</p>
                <Line options={options} data={data} />;
            </center>

        </div>
    )
}

