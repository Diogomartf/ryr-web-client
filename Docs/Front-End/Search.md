# Search
In this document we’ll give an overview of the key features implemented in the search system.


## Presentational Structure

The default search page presents itself as the following:

![/search (no filters applied)](https://d2mxuefqeaa7sj.cloudfront.net/s_9783C50D3195F5D443F1ACA9D2C05F2CB57E18C64A161FF299835A915A784883_1527674460416_Screen+Shot+2018-05-30+at+11.00.27.png)


There are three major components on the search page: **main filters** (top bar); **secondary filters** (left rectangle) and the **query results’ list** presented in the middle. The results shown on the image are result of the default search, with no filters applied. By design, the side filters are always applied, since they are always present, although this can be changed if decided upon.

## Filters’ Persistence

In order to improve the user experience of the application, we decided that the main filters input should be stored for later usage, so that the user can roam the application freely and comeback to the same search he may have performed earlier. We decided to keep the secondary filters out of this, due to the URL becoming extremely long (explained below), however a simple change to the code and the secondary filters become persisted as well.


![Parameterized search](https://d2mxuefqeaa7sj.cloudfront.net/s_9783C50D3195F5D443F1ACA9D2C05F2CB57E18C64A161FF299835A915A784883_1527688118224_Screen+Shot+2018-05-30+at+14.48.25.png)


As shown on the picture above, the URL contains information about the query the requested to the backend. This was a decision made so a user can share the URL after a search query and the receiving user gets the same search results of the sending user. 
In order to achieve this, we created a entry on the redux store called ***currentRental,*** where all the information related to the search is located:

![currentRental on Redux’s Store](https://d2mxuefqeaa7sj.cloudfront.net/s_9783C50D3195F5D443F1ACA9D2C05F2CB57E18C64A161FF299835A915A784883_1527688122708_Screen+Shot+2018-05-30+at+14.48.13.png)


This information is correlated with the information in the URL, meaning, if ***currentRental*** is empty and the user enters a parameterized URL, the store gets populated with that information. The inverse happens if ***currentRental*** is not empty and the user enters the unparameterized URL (*/search*), which is then transformed to present the parameterized version instead.


