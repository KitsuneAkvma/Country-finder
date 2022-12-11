import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

// Defining DOM elements

const searchBar = document.querySelector('.search__box');
// const searchButton = document.querySelector('.search__button');
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
    fetchCountries(finalURL);
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
