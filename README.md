# travelopia

Travels expert Travelopia provides unique travel experiences. You can do whatever you want like yatching, wildlife safaris, polar expeditions and many more. In this app user can book the trip by filling a form and also can see other's people trips in the Dashboard.

## Installation

### Backend 
You can start the project by installing all the dependencies using npm install or npm i. But you have to use your own mongodb database. So you have to create/maintain a database.

### Frontend
You can start your frontend part by installing all dependenices using npm install.

## Usage

Usage/Functionality of the Project - 
 - If you want to add a entry/ want to book a journey. You have to fill the form and just click on submit   button. your entry will be added to database and you can see them in *** Dashboard *** section.
 - Here you can see per page 5 bookings and you can navigate the pages with the help of prev and next buttons.
 - Reload button help you to reload that page again like if you are on page no. 3 and you click reload then pageno. 3 will be loaded again.
 - You also can download the csv file by clicking on **Download CSV** button. This will download the whole data (which is on database) in csv format for you.

 ## Screenshots

 Booking form/home page -
 trav1.png

 Dashboard page -
 trav2.png

 404 Page -
 trav3.png

 ## Api Documentation

 There are only one Route on which we have completed two tasks.
 - /booking -> if you do POST request on this route you can post the data to the database. you have to pass name, email, budget, destination and totalTravellers as json to body only then you can post the data. If you post the data then you got **booking Successful** as message other wise you got the error.

 - /booking?page -> this will help you to get the data as per the page if you dont pass the page you will get the first page data and every page consists five entries/ array of objects. You get paginated data and all the data.

 ## Configuration 

You have to add a .env file in your Backend folder and add there MONGO_DB url which you get from mongodb atlas only then you are able to run the server in your local machine.

## Contact 

You can reachme at [link](kk4064685@gmail.com) if you have any doubt.

## Acknowledgements 

freefrontend and uiverse helps me to create 404 page and loader component respectively.

## Thankyou if you read it till here 😃
