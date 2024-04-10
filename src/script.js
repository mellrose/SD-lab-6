document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');

    loadCarsBtn.addEventListener('click', () => {
        fetchCars(); // Fetch and display cars when the "Load Cars" button is clicked
    });
});

// Function to fetch cars from the API and display them
function fetchCars() {
    fetch('http://localhost:7071/api/cars/%7Bid%3F%7D')
        .then(response => response.json())
        .then(data => {
            const carList = document.getElementById('carList');
            carList.innerHTML = ''; // Clear previous car list

            data.forEach(car => {
                const carCard = document.createElement('div');
                carCard.classList.add('car-card');
                carCard.innerHTML = `
                    <h2>${car.make} ${car.model}</h2>
                    <p><strong>Year:</strong> ${car.year}</p>
                    <p><strong>Make:</strong> ${car.make}</p>
                    <p><strong>Model:</strong> ${car.model}</p>
                    <p><strong>Price:</strong> R${car.price}</p>
                `;
                carList.appendChild(carCard);
            });
        })
        .catch(error => {
            console.error('Error fetching car data:', error);
        });
}

// Function to add a new car
function addCar(newCar) {
    fetch('http://localhost:7071/api/cars/%7Bid%3F%7D', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchCars(); // Reload cars after adding a new car
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const carForm = document.getElementById('carForm');

carForm.addEventListener('submit', event => {
    event.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    addCar({ make, model, year, price });
    carForm.reset();
});
