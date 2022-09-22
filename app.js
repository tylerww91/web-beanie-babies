/* Imports */
import { getBeanieBabies, getAstroSigns } from './fetch-bb.js';
import { renderBeanie, renderAstroSignOption } from './render-bb.js';
/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const beanieBabiesList = document.getElementById('beanie-babies-list');
const beanieImage = document.getElementById('beanie-image');
const astroSignSelect = document.getElementById('astro-sign-select');

/* State */
let beanies = [];
let astroSigns = [];
let error = null;
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

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new formData(searchform);
    findBeanies(formData.get('title'), formData.get('beanie_baby_astro_signs'));
});

/* Display Functions */
async function findBeanies(title, astroSign) {
    const response = await getBeanieBabies(title, astroSign);

    error = response.error;
    beanies = response.data;

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

// (don't forget to call any display functions you want to run on page load!)
displayBeanieBabies();
