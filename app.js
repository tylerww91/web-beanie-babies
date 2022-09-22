/* Imports */
import { getBeanieBabies } from './fetch-bb.js';
import { renderBeanie } from './render-bb.js';
/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const beanieBabiesList = document.getElementById('beanie-babies-list');
const beanieImage = document.getElementById('beanie-image');

/* State */
let beanies = [];
let error = null;
/* Events */
window.addEventListener('load', async () => {
    findBeanies();
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
// (don't forget to call any display functions you want to run on page load!)
displayBeanieBabies();
