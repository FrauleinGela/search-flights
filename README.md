# SearchFlights

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

Project consists in getting results from an external API - Amadeus <br>

## Authentication and Amadeus API Flow
A clear picture of how Angular app and Amadeus API authentication is connected. 
![image](https://user-images.githubusercontent.com/7724026/155352698-fb9584ba-1be5-43a4-8d06-8d233562ad63.png)

## Control flow for flights destination using Model View Presenter Pattern
![image](https://user-images.githubusercontent.com/7724026/155385741-95676c15-c820-4ee7-b265-e601bb60ec0e.png)

* As we may see, here we have a container component that will import all ui presentational components
* SearchFilter UI presentational Component is responsible only to show the current state to the user. It means that there is no need for Angular detection cycle be running all time. (That is why we use OnPush) 
* We may also see that SearchFilter Component is a presentational component, though at the same time it carries a Presenter Service. 
* Presenter service deals with all necessary validations regarding Form fields. For example: If a form is valid, then emit changes to outer components to do what it's necessary.


## Issues I found during development while getting data from Amadeus
- API returns 500 status code error when chosen other origin countries - FIXED: I kept only MAD and LON as the only available origins.
- 404 status code when API has no results :_(. It should not return a bad request, though. FIXED: I added a HandleError Interceptor to be able to display empty results when no data

## External libraries used
- Spectator - To be able to mock Services and remove angular boilerplate code related to TestBed
- Moment - To be able to choose the desired format that would be sent to API as a query parameter


## Run application
1. Install Angular:  ` npm install - g @angular/cli `
2. Install all modules needed:  `    npm i `
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
