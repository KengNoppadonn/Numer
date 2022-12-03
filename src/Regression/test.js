const { sum, det } = require("mathjs");


const cal_matrix = (v_x, v_y) => {
    // console.log(v_x)
    var size = v_x.length
    // console.log(size);
    var array = [size]
    var ansB = 0
    console.log(v_y);
    for (var i = 0; i < size; i++) {
        array[i] = 0
    }
    for (var i = 0; i < v_x.length; i++) {
        // console.log(array[i]);
        if (v_x[i] != 0 && v_y[i] != 0) {
            ansB = v_x[i] * v_y[i]
            array[i] = ansB
            // console.log(array)
        }
    }
    ansB = sum(array)
    console.log("Ans= ", ansB);
    return ansB
}


var val_x = [[1, 0, 2, 3, 4, 2, 1], [0, 1, 4, 2, 1, 3, 6], [1, 3, 1, 2, 5, 3, 4]];
var val_y = [4, -5, -6, 0, -1, -7, -20];
var ans_y = 0;
var ans = 0;
var save_matrixA = [];
var save_matrixB = []
var check_sum_pow = 1;
for (var i = 0; i < val_x.length + 1; i++) {
    save_matrixA[i] = []
    for (var j = 0; j < val_x.length + 1; j++) {
        save_matrixA[i][j] = 0
        save_matrixB[i] = 0
    }
}
console.log(save_matrixA);
console.log(save_matrixB);
ans_y = sum(val_y)
console.log(ans_y);
// ans_y = sum(val_y)
// console.log(val_x.length);
for (var i = 0; i < val_x.length + 1; i++) {
    if (i == 0) {
        save_matrixA[0][i] = val_x[0].length
        save_matrixB[i] = ans_y
    } else {
        ans = cal_matrix(val_x[i - 1], val_y)
        save_matrixA[0][i] = sum(val_x[i - 1])
        save_matrixA[i][0] = sum(val_x[i - 1])
        save_matrixB[i] = ans
    }
}
console.log(save_matrixA);
console.log(save_matrixB);
for (var i = 1; i < val_x.length + 1; i++) {
    var sumPow = 0
    for (var j = 1; j < val_x.length+1; j++) {
        if (i == j) {
            for (var k = 0; k < val_x[i].length; k++) {
                sumPow += Math.pow(val_x[i - 1][k], 2);
            }
            save_matrixA[i][j] = sumPow;
        } else {
            save_matrixA[i][j] = cal_matrix(val_x[i-1],val_x[j-1])
        }
    }
    // check_sum_pow++;
}
console.log(save_matrixA);


        var matrixA = save_matrixA
        var matrixB = save_matrixB
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
                console.log("ans = ",size_matrix,transMatrix);
            }
            console.log(det(transMatrix)," ",det(matrixA));
            arrayAns[size_matrix] = Math.round(det(transMatrix)) / Math.round(det(matrixA))
            // determinant.push(Math.round(det(transMatrix)))
            // console.log(Delta);s
            size_matrix++
        }
        // console.log(arrayAns);

// console.log(save_matrix);