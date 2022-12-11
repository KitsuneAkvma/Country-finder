import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

// Defining DOM elements

const searchBar = document.querySelector('.search__box');
const searchButton = document.querySelector('.search__button');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchBar.addEventListener(
  'input',
  debounce(() => {
    if (searchBar.value == '') {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    }
    let countryName = searchBar.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(finalURL)
      .then(response => response.json())
      .then(data => {
        countryList.innerHTML = '';
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
              searchBar.value = '';
              countryList.innerHTML = '';
              fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
                .then(response => response.json())
                .then(data => {
                  countryInfo.innerHTML = `<div class="country-info__wrapper">
                <div class="country-info__symbols">
                  <img src="${data[0].flags.svg}" alt="National flag" class="country-info__flag" />
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
            })
          );
        });
      })
      .catch(error => {
        if (countryName.length == 0) {
          console.log('field is empty');
        } else {
          Notiflix.Notify.failure(`${error}`);
          console.log(error);
        }
      });
  }, 300)
);
// // Variables
// const DEBOUNCE_DELAY = 300;
// // Functions
// function fetchCountries(name) {
//   //Tworzy żądanie HTTP na nazwa źródła i przekazuje obietnicę z tablicą krajów - wynikiem żądania. Przenieś ją do oddzielnego pliku fetchCountries.js i utwórz eksport nazwany.
//   fetch(`https://restcountries.com/v3.1/name/${name}`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then(response => {
//       if (!response.ok) throw new Error('There was an error!');

//       return response.json();
//     })
//     .then(body => {

//     })
//     .catch(error => console.log(error))
//     .finally(() => console.log('Promise fuffield!'));
// }

// searchBar.addEventListener('input', fetchCountries(searchBar.value));
