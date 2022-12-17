import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries,countryData } from './fetchCountries';

// Defining DOM elements
const searchBar = document.querySelector('.search__box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function createInfoPage(countryData) {
  // create country info page
  countryInfo.innerHTML = `<div class="country-info__wrapper">
   <div class="country-info__symbols">
     <img src="${countryData.flags}" alt="National flag" class="country-info__flag" />
     <img src="${countryData.coatsOfArms}" alt="Coat of Arms" class="country-info__emblem" />
   </div>
   <div class="country-info__data">
     <h2 class="country-info__common-name">${countryData.nameCommon}</h2>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">${countryData.haveS(
         'Alternative spelling',
         countryData.alternativeSpellings
       )}</h3>
       <p class="data--content">${countryData.alternativeSpellings}</p>
     </div>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">${countryData.haveS('Language', countryData.languages)}</h3>
       <p class="data--content">${countryData.languages.toString().split(',').join(', ')}</p>
     </div>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">Currency</h3>
       <p class="data--content">${countryData.currencies}</p>
     </div>
     <div class="country-info__data__separator"></div>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">Capital</h3>
       <p class="data--content">${countryData.capital}</p>
     </div>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">Continent</h3>
       <p class="data--content">${countryData.continent}</p>
     </div>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">Timezone</h3>
       <p class="data--content">${countryData.timeZone}</p>
     </div>
     <div class="country-info__data__wrapper">
       <h3 class="data--name">Population</h3>
       <p class="data--content">${countryData.population}</p>
     </div>
   </div>
   </div>`;
}
// call event on every change in value. I used debounce to block too many requests
searchBar.addEventListener(
  'input',
  debounce(() => {
    if (searchBar.value == '') {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    }
    let countryName = searchBar.value.trim();
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}`;

    // look for country with name simmiliar to the input
    fetchCountries(finalURL, countryName);
  }, 300)
);
