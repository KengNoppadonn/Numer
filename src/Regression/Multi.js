import { sum, det } from 'mathjs';
import React, { useState } from 'react'

export const Multi = () => {
    var num = 0;
    const [val_x, Setval_x] = useState([])//kb
    const [val_y, Setval_y] = useState([])//kb
    const [array_cal, setCalArrA] = useState([]);
    const [array_Delta, setDelta] = useState([]);

    const changeNum = (e) => {
        num = Number(e.target.value)
    }
    



    const creatMatrix = (event, num) => {
        //console.log(event.target.value)
        if (Number(event.target.value) >= 1) {
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
        }
        else {
            var a = []
            var b = []
            Setval_x(a)
            Setval_y(b)
        }
    }


    const SetMatrix_X = (event, i, j) => {
        val_x[i][j] = parseFloat(event.target.value)
        // console.log(val_x)
    }

    const SetMatrix_Y = (event, i) => {
        val_y[i] = parseFloat(event.target.value)
    }

    const SetMatrix = () => {
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
                var ans_y=0
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
            if (v_x[i] != 0 && v_y[i] != 0) { //[0,1,2] [2,4,0]
                ansB = v_x[i] * v_y[i]
                array[i] = ansB //[0,4,0]
                // console.log(array)
            }
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
        while (size_matrix != matrixA.length) { //matrixA = 4 * vิงตามการบ้าน
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



    return (
        <div>
            <center>
                <h1>Multi</h1>
                <p><input size="lg" type="text" name="Point" onChange={changeNum} placeholder="X Size" /></p>
                <p><input size="lg" type="text" onChange={event => creatMatrix(event, num)} placeholder="X Number" /></p>

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
                <button onClick={SetMatrix}>Calculate</button>

                <p>Answer This Multi-Regression with CramerRule</p>
                <br /><br />
                {array_cal.map((ans, i) => (
                    <h1>a{i + 1}= (delta{i + 1}/delta0  )=({array_Delta[i + 1]} /{array_Delta[0]} ) =   {ans.toFixed(6)}   </h1>

                ))}
            </center>
        </div>
    )
}

