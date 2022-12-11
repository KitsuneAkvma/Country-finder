import { country } from './index.js';
import Notiflix from 'notiflix';

const searchBar = document.querySelector('.search__box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// to search for countries with not specified country name
export function fetchCountries(url, countryName) {
  fetch(url)
    .then(response => response.json()) // take JSON respond and return JS object
    .then(data => {
      countryList.innerHTML = ''; // clear the list on every change 
      if (data.length > 10) {
        // when there is more than 10 results return a notify and stop promise
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length > 1 && data.length <= 10) {
        //when there is 2-10 results - show list of results
        data.forEach(element => {
            // put up recived array's object and show them on a list
          let country = document.createElement('li');
          let countryNam = document.createElement('div');
          let countryFlag = document.createElement('div');

          // adding classes
          country.classList.add('country-list__item');
          countryNam.classList.add(`country-list__item--name`);
          countryFlag.classList.add(`country-list__item--flag`);

          // putting informations from recived objects
          countryNam.innerHTML = `${element.name.common}`;
          countryFlag.innerHTML = `${element.flag}`;

          // making DOM hierarchy of the list

          country.appendChild(countryFlag);
          country.appendChild(countryNam);
          countryList.appendChild(country);

          let selectedCountry; // used to hold input value

          //adding event listeners to every result
          document.querySelectorAll('.country-list__item').forEach(element =>
            element.addEventListener('click', event => {
              selectedCountry = event.currentTarget.querySelector(
                '.country-list__item--name'
              ).innerHTML;
              // when user clicks on country - get it's name and pass it to the function
              // call simmiliar function optimized to find specified name
              fetchCountry(`https://restcountries.com/v3.1/name/${selectedCountry}`);
              
              // clear searchbar and results list
              searchBar.value = '';
              countryList.innerHTML = '';
            })
          );
        });
      } else {
        //when there is only one result - find it bypassing list making
        fetchCountry(`https://restcountries.com/v3.1/name/${data[0].name.common}`);
      }
    })
    .catch(error => {
      if (countryName.length == 0) {
        // do notthing
      } else {
        // in a situation where there is no result, display a notification asking user to enter a valid/different name
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      }
    });
}

// to use with specified country name
function fetchCountry(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
        // create country info page
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
