import { country } from './index.js';
import Notiflix from 'notiflix';
import { createInfoPage } from './index.js';

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

              //find country by name
              let found = data.find((element, index) => {
                if (element.name.common == selectedCountry) {
                  console.log(index);
                  return index;
                }
              });
              found == undefined ? (found = data[0]) : (found = found);
              console.log();
              console.log();
              console.log(found);

              //create found country page (index.js)
              createInfoPage(found);

              // clear searchbar and results list
              searchBar.value = '';
              countryList.innerHTML = '';
              return;
            })
          );
        });
      } else {
        //when there is only one result

        let found = data[0];
        //create found country page (index.js)
        createInfoPage(found);
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
