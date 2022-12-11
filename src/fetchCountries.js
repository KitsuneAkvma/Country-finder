import { country } from './index.js';

const searchBar = document.querySelector('.search__box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// to search for countries with not specified country name
export function fetchCountries(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      countryList.innerHTML = '';
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length > 1 && data.length <= 10) {
        data.forEach(element => {
          let country = document.createElement('li');
          let countryNam = document.createElement('div');
          let countryFlag = document.createElement('div');
          // let countryFound = document.createTextNode(`${element.flag} ${element.name.common}`);
          // country.appendChild(countryFound);
          country.classList.add('country-list__item');
          countryNam.classList.add(`country-list__item--name`);
          countryFlag.classList.add(`country-list__item--flag`);

          countryNam.innerHTML = `${element.name.common}`;
          countryFlag.innerHTML = `${element.flag}`;

          country.appendChild(countryFlag);
          country.appendChild(countryNam);
          countryList.appendChild(country);
          let selectedCountry;

          document.querySelectorAll('.country-list__item').forEach(element =>
            element.addEventListener('click', event => {
              selectedCountry = event.currentTarget.querySelector(
                '.country-list__item--name'
              ).innerHTML;
              fetchCountry(`https://restcountries.com/v3.1/name/${selectedCountry}`);
              searchBar.value = '';
              countryList.innerHTML = '';
            })
          );
        });
      } else {
        fetchCountry(`https://restcountries.com/v3.1/name/${data[0].name.common}`);
      }
    })
    .catch(error => {
      if (countryName.length == 0) {
      } else {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
        console.log(error);
      }
    });
}

// to use with specified country name
function fetchCountry(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      countryInfo.innerHTML = `<div class="country-info__wrapper">
                  <div class="country-info__symbols">
                    <img src="${
                      data[0].flags.svg
                    }" alt="National flag" class="country-info__flag" />
                    <img src="${
                      data[0].coatOfArms.svg
                    }" alt="Coat of Arms" class="country-info__emblem" />
                  </div>
                  <div class="country-info__data">
                    <h2 class="country-info__common-name">${data[0].name.common}</h2>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Alternative spellings</h3>
                      <p class="data--content">${data[0].altSpellings
                        .toString()
                        .split(',')
                        .join(', ')}</p>
                    </div>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Languages</h3>
                      <p class="data--content">${Object.values(data[0].languages)}</p>
                    </div>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Currency</h3>
                      <p class="data--content">${Object.keys(data[0].currencies)}</p>
                    </div>
                    <div class="country-info__data__separator"></div>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Capital</h3>
                      <p class="data--content">${data[0].capital[0]}</p>
                    </div>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Continent</h3>
                      <p class="data--content">${data[0].continents[0]}</p>
                    </div>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Timezone</h3>
                      <p class="data--content">${data[0].timezones[0]}</p>
                    </div>
                    <div class="country-info__data__wrapper">
                      <h3 class="data--name">Population</h3>
                      <p class="data--content">${Intl.NumberFormat().format(data[0].population)}</p>
                    </div>
                  </div>
                </div>`;
    });
}
