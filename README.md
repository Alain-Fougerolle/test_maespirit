# Fetch

At Maespirit, our use of APIs is fundamental. We design, create, consume and maintain them in a daily basis. Your job today will be to query one, and transform the response. 

You should not go past 2 hours of work here. If that is the case, we ask you to stop. It is ok, you will explain why !

## API
For the purpose of this exercice, we will be using The Space Devs APIs https://thespacedevs.com/llapi .
Be carefull, 300 requests a day maximum for free plan. But 300 is a lot for 2 hours :D

To avoid throttle, i suggest you save a sample of answer to work on.

You will find documentation on the method here : https://ll.thespacedevs.com/2.2.0/swagger .

You will use the GET /launch/ method.

Each item returned from the /launch/ endpoint will have the following:
- id : a unique id
- pad.location : an object representing the location the launch happened
- status : an object representing the state of the launch. status.id is defined as follow :
  - 1: Go for launch
  - 2: To be determined
  - 3: Launch successful
  - 4: Launch failure
  - 5: On hold
  - 6: Launch in flight
  - 7: Launch was a partiel failure
  - 8: To be confirmed
  
The /launch/ endpoint accepts the following options, sent as query string parameters on the request URL:
- limit: The number of items to be returned
- offset: The index of the first item to be returned
- location__ids: A list of integers separated with comma, representing ids of pad locations

An example request URL might look like:

    /launch/?limit=2&offset=0&location__ids=1,2

## Task

In api/launches.js, write a function named retrieve that requests data from the /launch/ endpoint, transforms the result into the format outlined below, and returns a promise that resolves with the transformed object. In addition to retrieve, you may add as many helper functions as you wish.

Create a Launch component, responsible for displaying the results.

1. Get data from the /launch/ endpoint using the Fetch API. Process pages of 10 items at a time.
2. The retrieve function accepts an options object and should support the following keys:
- page - Specifies which page to retrieve from the /launch/ endpoint. If omitted, fetch page 1.
- locations - An array of location ids to retrieve from the /launch/ endpoint. If omitted, fetch all locations.

As an example, to fetch the 2nd page of Cape Canaveral (12) and SpaceX Space Launch Facility (143) launches from the API, retrieve might be called like this:

    retrieve({ page: 2, locations: [12, 143] });

3. You can assume standard HTTP status codes on the response. If a request is unsuccessful, output a simple error message via console.log() and recover.
4. Upon a successful API response, transform the fetched payload into an object containing the following keys:

- ids: An array containing the ids of all items returned from the request.
- success: An array containing all of the items returned from the request that have a status.id value of 3. Add a new key to each item called is_canaveral_or_spaceX indicating whether or not the item is located in Cape Canaveral or SpaceX Space Launch Facility (12 or 143).
- failure_canaveral_spacex: The total number of items returned from the request that have a status.id value of 3 or 7 and located in Canaveral or SpaceX.
- previousPage: The page number for the previous page of results, or null if this is the first page.
- nextPage: The page number for the next page of results, or null if this is the last page.

5. Return a promise from retrieve that resolves with the transformed data.
6. Exploit this promise in your Launch component to show results the way you want

## Setup

You need node >= 10.

    > yarn #to install
    > yarn dev #to launch with HMR

---
Heavily inspired by https://homework.adhoc.team/fetch/