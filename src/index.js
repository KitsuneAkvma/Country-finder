import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

// Defining DOM elements
const searchBar = document.querySelector('.search__box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

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
    fetchCountries(finalURL, countryName); // look for country with name simmiliar to the input
  }, 300)
);
