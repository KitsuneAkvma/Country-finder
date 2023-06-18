import Notiflix from 'notiflix';
import { createInfoPage } from './index.js';

const searchBar = document.querySelector('.search__box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// Search for countries with the specified country name
export function fetchCountries(url, countryName) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      countryList.innerHTML = '';

      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length > 1 && data.length <= 10) {
        data.forEach(element => {
          const country = document.createElement('li');
          const countryNam = document.createElement('div');
          const countryFlag = document.createElement('div');

          country.classList.add('country-list__item');
          countryNam.classList.add('country-list__item--name');
          countryFlag.classList.add('country-list__item--flag');

          countryNam.textContent = element.name.common;
          countryFlag.textContent = element.flag;

          country.appendChild(countryFlag);
          country.appendChild(countryNam);
          countryList.appendChild(country);

          country.addEventListener('click', () => {
            const selectedCountry = element.name.common;

            const found = data.find(item => item.name.common === selectedCountry);
            const foundCountry = found || data[0];

            createInfoPage(foundCountry);

            searchBar.value = '';
            countryList.innerHTML = '';
          });
        });
      } else if (data.length === 1) {
        createInfoPage(data[0]);
      }
    })
    .catch(error => {
      if (countryName.length > 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}
