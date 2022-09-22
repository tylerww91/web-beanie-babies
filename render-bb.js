export function renderBeanie(beanie) {
    const li = document.createElement('li');
    li.classList.add('card');

    const img = document.createElement('img');
    img.src = beanie.image;
    img.alt = beanie.title;

    const h2 = document.createElement('h2');
    h2.textContent = beanie.title;

    const details = document.createElement('div');
    details.classList.add('details');

    const attributes = document.createElement('p');
    attributes.classList.add('attributes');

    const animal = document.createElement('span');
    animal.textContent = beanie.animal;

    const astroSign = document.createElement('span');
    astroSign.textContent = beanie.astroSign;

    attributes.append(animal, astroSign);

    const releaseDate = document.createElement('p');
    releaseDate.classList.add('release-date');
    releaseDate.textContent = `released on ${beanie.releaseDate}`;

    details.append(h2, attributes, releaseDate);

    li.append(img, details);

    return li;
}

export function renderAstroSignOption(astroSign) {
    const option = document.createElement('option');
    option.value = astroSign.name;
    option.textContent = astroSign.name;
    return option;
}
