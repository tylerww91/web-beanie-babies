/* Imports */
import { getBeanieBabies, getAstroSigns, getAnimals } from './fetch-bb.js';
import { renderBeanie, renderAstroSignOption, renderAnimalOption } from './render-bb.js';
/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const beanieBabiesList = document.getElementById('beanie-babies-list');
const astroSignSelect = document.getElementById('astro-sign-select');
const animalSelect = document.getElementById('animal-select');
const notificationDisplay = document.getElementById('notification-display');

/* State */
let beanies = [];
let astroSigns = [];
let animals = [];
let error = null;
let count = 0;
/* Events */
window.addEventListener('load', async () => {
    findBeanies();

    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

window.addEventListener('load', async () => {
    findBeanies();

    const response = await getAnimals();

    error = response.error;
    animals = response.data;

    if (!error) {
        displayAnimalOptions();
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    findBeanies(formData.get('name'), formData.get('astroSign'), formData.get('animal'));
});

/* Display Functions */
async function findBeanies(title, astroSign, animal) {
    const response = await getBeanieBabies(title, astroSign, animal);

    error = response.error;
    beanies = response.data;
    count = response.count;
    animals = response.data;

    displayNotifications();
    if (!error) {
        displayBeanieBabies();
    }
}

function displayBeanieBabies() {
    beanieBabiesList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieBabiesList.append(beanieEl);
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const astroSignEl = renderAstroSignOption(astroSign);
        astroSignSelect.append(astroSignEl);
    }
}

function displayAnimalOptions() {
    for (const animal of animals) {
        const animalEl = renderAnimalOption(animal);
        animalSelect.append(animalEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classlist.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.textContent = `Displaying ${beanies.length} of ${count} matching results`;
    }
}

// (don't forget to call any display functions you want to run on page load!)
displayBeanieBabies();
