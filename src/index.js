import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries, countryData } from './fetchCountries';

const searchBar = document.querySelector('.search__box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function createInfoPage(found) {
  const countryData = {
    flags: found.flags.svg,
    coatsOfArms: found.coatOfArms.svg,
    nameCommon: found.name.common,
    alternativeSpellings: found.altSpellings.join(', '),
    languages: Object.values(found.languages),
    currencies: Object.keys(found.currencies).join(', '),
    capital: found.capital,
    continent: found.continents[0],
    timeZone: found.timezones[0],
    population: Intl.NumberFormat().format(found.population),
    maps: found.maps,
  };

  for (let prop in countryData) {
    if (countryData[prop] === undefined) {
      countryData[prop] = 'none';
    }
  }


  countryInfo.innerHTML = `
    <div class="country-info__wrapper">
      <div class="country-info__symbols">
        <img src="${countryData.flags}" alt="National flag" class="country-info__flag" />
        ${
          countryData.coatsOfArms !== undefined &&
          `<img src="${countryData.coatsOfArms}" alt="Coat of Arms" class="country-info__emblem" />`
        }
      </div>
      <div class="country-info__data">
        <h2 class="country-info__common-name">${countryData.nameCommon}</h2>
        <div class="country-info__data__wrapper">
          <h3 class="data--name">Alternative spellings</h3>
          <p class="data--content">${countryData.alternativeSpellings}</p>
        </div>
        <div class="country-info__data__wrapper">
          <h3 class="data--name">${countryData.languages.length > 1 ? 'Languages' : 'Language'}</h3>
          <p class="data--content">${countryData.languages.join(', ')}</p>
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
      <a href=${countryData.maps.googleMaps} target=”_blank”>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/512px-Google_Maps_icon_%282015-2020%29.svg.png?20200220195824" alt="Google street view" class="country-info__maps-google" /></a>
      <a href=${countryData.maps.openStreetMaps} target=”_blank”>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/256px-Openstreetmap_logo.svg.png?20220919103849" alt="openStreet Maps" class="country-info__maps-google" /></a>
    </div>`;
}

searchBar.addEventListener(
  'input',
  debounce(() => {
    if (searchBar.value === '') {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    }

    const countryName = searchBar.value.trim();
    const finalURL = `https://restcountries.com/v3.1/name/${countryName}`;

    fetchCountries(finalURL, countryName);
  }, 300)
);
