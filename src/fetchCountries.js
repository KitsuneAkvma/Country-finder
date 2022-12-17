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
              // when user clicks on country - get it's name and pass it to the function
              // call simmiliar function optimized to find specified name
              fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
                .then(response => response.json())
                .then(data => {
                  let countryData = {
                    flags: data[0].flags.svg,
                    coatsOfArms: data[0].coatOfArms.svg,
                    nameCommon: data[0].name.common,
                    alternativeSpellings: data[0].altSpellings.toString().split(',').join(', '),
                    languages: Object.values(data[0].languages),
                    currencies: Object.keys(data[0].currencies),
                    capital: data[0].capital,
                    continent: data[0].continents[0],
                    timeZone: data[0].timezones[0],
                    population: Intl.NumberFormat().format(data[0].population),

                    haveS: function (word, prop) {
                      switch (prop.length > 1) {
                        case true: {
                          return (word += 's');
                        }
                        case false:
                          return (word = word);
                      }
                    },
                  };
                  for (let prop in countryData) {
                    if (countryData[`${prop}`] === undefined) {
                      countryData[`${prop}`] = 'none';
                    }
                  }
                  createInfoPage(countryData);
                });

              // clear searchbar and results list
              searchBar.value = '';
              countryList.innerHTML = '';
            })
          );
        });
      } else {
        //when there is only one result - find it bypassing list making
        fetch(`https://restcountries.com/v3.1/name/${data[0].name.common}`)
          .then(response => response.json())
          .then(data => {
            let countryData = {
              flags: data[0].flags.svg,
              coatsOfArms: data[0].coatOfArms.svg,
              nameCommon: data[0].name.common,
              alternativeSpellings: data[0].altSpellings.toString().split(',').join(', '),
              languages: Object.values(data[0].languages),
              currencies: Object.keys(data[0].currencies),
              capital: data[0].capital,
              continent: data[0].continents[0],
              timeZone: data[0].timezones[0],
              population: Intl.NumberFormat().format(data[0].population),

              haveS: function (word, prop) {
                switch (prop.length > 1) {
                  case true: {
                    return (word += 's');
                  }
                  case false:
                    return (word = word);
                }
              },
            };
            for (let prop in countryData) {
              if (countryData[`${prop}`] === undefined) {
                countryData[`${prop}`] = 'none';
              }
            }
            createInfoPage(countryData);
          });
      }
    })
    .catch(error => {
      if (countryName.length == 0) {
        // do notthing
      } else {
        // in a situation where there is no result, display a notification asking user to enter a valid/different name
        // function containsSpecialChars(str) {
        //   let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        //   return specialChars.test(str);
        // }
        // if (containsSpecialChars(searchBar.value)) {
        //   Notiflix.Notify.info('✅ string contains special characters');
        //   return;
        // } else{}
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      }
    });
}
