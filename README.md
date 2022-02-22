# SearchFlights

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

Project consists in getting results from an external API - Amadeus <br>
A clear picture of how Angular app and Amadeus API authentication is connected. 
## Authentication and Amadeus API Flow
![image](https://user-images.githubusercontent.com/7724026/155230370-fd5651c5-6a23-47f9-9d60-3713c7e3f0d8.png)
## A control flow for flights destination view using Model View Presenter
![image](https://user-images.githubusercontent.com/7724026/155231270-1ca9691b-6a49-45de-b52f-365ab00ad824.png)

## Issues I found during development while getting data from Amadeus

. 500 status code error if chosen a country origin that is different from MAD (Madrid) - FIXED: I kept only MAD as the only available origin.
. 404 status code when API has no results :_( FIXED: I added a HandleError Interceptor to be able to display empty results when no data

## External libraries used
. Spectator - To be able to mock Services and remove angular boilerplate code related to TestBed
. Moment - To be able to choose the desired format that would be sent to API as a query parameter


## Run application
1. Install Angular:  npm install - g @angular/cli
2. Install all modules needed:      npm i
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
