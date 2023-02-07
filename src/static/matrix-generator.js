const MAX_NUM_CITIES = 50;

// Create headers for the table
function createTh(row, scope, text) {
    const th = document.createElement('th');
    th.setAttribute('scope', scope);
    if (scope == 'col') {
        th.className = 'col-1 p-1';
    }

    text = isNaN(text) ? text : String(text).padStart(MAX_NUM_CITIES.toString().length, '0');
    const textNode = document.createTextNode(text);
    th.appendChild(textNode);
    row.appendChild(th);
}

function generateTableHead(matrix, numCities) {
    const thead = matrix.createTHead();
    const row = thead.insertRow();
    row.className = 'd-flex text-center';
    createTh(row, 'row', '#');
    for (let i = 1; i <= numCities; i++) {
        createTh(row, 'col', i);
    }
}

function generateTableBody(matrix, numCities, matrixValues) {
    const tbody = matrix.createTBody();
    for (let i = 1; i <= numCities; i++) {
        const row = tbody.insertRow();
        row.className = 'd-flex';
        createTh(row, 'row', i);
        for (let j = 1; j <= numCities; j++) {
            const col = row.insertCell();
            col.className = 'col-1 p-1';

            const input = document.createElement("input");
            input.setAttribute('type', 'number');
            input.setAttribute('step', 'any');
            input.className = 'form-control';

            if (matrixValues !== undefined) {
                input.disabled = true;
                input.value = matrixValues[i - 1][j - 1]
            }

            col.appendChild(input);
        }
    }
}

// Generates the table of inputs, empty or with values
function generateMatrix(matrix, numCities, matrixValues) {
    matrix.innerHTML = '';
    generateTableHead(matrix, numCities);
    generateTableBody(matrix, numCities, matrixValues);
}