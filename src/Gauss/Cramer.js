import React, { useState } from 'react'
import { det } from 'mathjs'

export const Cramer = () => {
    const [matA, setA] = useState([])
    const [matB, setB] = useState([])
    const [ans, setAns] = useState([])
    const [Delta, setDet] = useState([])
    const [re,setRe]=useState([])

    const SetMattrix = (event) => {
        if (Number(event.target.value) > 1) {
            var a = []
            var b = []
            for (var i = 0; i < Number(event.target.value); i++) {
                a[i] = []
                for (var k = 0; k < Number(event.target.value); k++) {

                    a[i][k] = 0
                    b[i] = 0

                }
                setA(a)
                setB(b)
            }
        }
        else {
            var a = []
            var b = []
            setA(a)
            setB(b)
        }
    }



    const ChangematrixA = (event, row, column) => {

        matA[row][column] = parseFloat(event.target.value)
    }
    const ChangematrixB = (event, row) => {

        matB[row] = parseFloat(event.target.value)
    }

    const cal = () => {
        var matrixA = matA
        var matrixB = matB
        var size_matrix = 0
        var arrayAns = []
        var determinant = []

        determinant.push(Math.round(det(matrixA)))
        while (size_matrix != matrixA.length) {
            var transMatrix = copyMat(matrixA)
            for (var i = 0; i < matrixA.length; i++) {
                for (var j = 0; j < matrixA.length; j++) {
                    if (j == size_matrix) {
                        transMatrix[i][j] = matrixB[i]
                        break;
                    }
                }

            }
            arrayAns[size_matrix] = Math.round(det(transMatrix)) / Math.round(det(matrixA))
            determinant.push(Math.round(det(transMatrix)))
            // console.log(arrayAns)
            // console.log(determinant)
            size_matrix++
        }

        setAns(arrayAns)
        //console.log(arrayAns)
        setDet(determinant)
        Revers();
        // console.log(re)
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


    const Revers=()=>{
        var maA=matA
        var maX=ans
        var cal=[]
        var jot="";
         //console.log(maA[1][1])
         //console.log(maX[1])

        for(var i=0;i<maA.length;i++){
            var Sum=0;
            //console.log(Sum)
            for(var j=0;j<maX.length;j++){
                // console.log(maA[i][j])
                // console.log(maX[i])
                Sum+=maA[i][j]*maX[j]

            }
            //console.log(Sum)
            cal.push(Sum)

        }
        setRe(cal)
        //console.log(cal)
    }
    

    return (
        <div><center>
            <p><input placeholder="Matrix Size" onChange={SetMattrix} /></p>

            {matA.map((matrixValueA, i) => (<div>

                <tbody>

                    <tr>

                        {matrixValueA.map((Change_row_column, j) => (

                            <td><input onChange={event => ChangematrixA(event, i, j)} /></td>
                        ))}
                        |<td><input onChange={event => ChangematrixB(event, i)} /></td>
                    </tr>

                </tbody>

            </div>))}
            <p><button onClick={cal}>Cal X</button></p>
            <p><button onClick={Revers}>Cal B</button></p>
            {ans.map((ans, i) => (
                <h1>X{i + 1}=   {ans.toFixed(6)}   </h1>
            ))}

            {re.map((ans,i)=>(
                
                <h1>B{i+1}= {ans.toFixed(0)}</h1>
            ))
            }



            



        </center>
        </div>

    )
}
