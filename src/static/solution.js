const matrix = document.getElementById('matrix');
const matrixValues = JSON.parse(matrix.dataset.matrix)
generateMatrix(matrix, matrixValues.length, matrixValues);