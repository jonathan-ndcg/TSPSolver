const DEFAULT_NUM_GEN = 50;

// Validates that the number of cities is a number between 1 and the max number of cities
function validateNumCities(numCities) {
    numCities = Number(numCities);
    if (numCities < 1 || numCities > MAX_NUM_CITIES || !Number.isInteger(numCities)) {
        alertPlaceholder.innerHTML = `<div class="alert alert-warning" role="alert">Choose an integer between 1 and ${MAX_NUM_CITIES}.</div>`;
        return;
    }
    alertPlaceholder.innerHTML = '';
    generateMatrix(matrix, numCities);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Get matrix values and send to the server to solve
function solve() {
    numGenerations = Number.parseInt(numGenerationsInput.value);
    numGenerations = !isNaN(numGenerations) ? numGenerations : DEFAULT_NUM_GEN;

    const matrix = [...document.querySelectorAll('#matrix tr')].slice(1).map(row => {
        return [...row.querySelectorAll('input')].map(input => {
            value = parseFloat(input.value);
            return isNumeric(value) ? value : 0;
        });
    });

    const data = { distance_matrix: matrix, num_generations: numGenerations }

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(response => window.location.href = `/result/${response}`
        );
}

const matrix = document.getElementById('matrix');
const alertPlaceholder = document.getElementById('numCitiesAlertPlaceholder');
const numGenerationsInput = document.getElementById('numGenerationsInput');