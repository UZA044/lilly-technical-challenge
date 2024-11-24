# Lilly Technical Challenge Documentation Template

## Approach

My approach to the challenges was to understand the different aspects of this challenge including backend frontend and how they communicate with each other. Looking at the objectives I decided to work on the challenge in this particular order: 

1)Fetch data from the backend server and send it to the the frontend, displaying it in a user-friendly way.
    - This was to create a basic HTML structure adding in the different forms to handle any data user enters
    - In this step incorporated all the different backend APIs utilizing forms buttons and a table to display medicines

2)A data engineer had some issues migrating data, leaving some gaps in our database. How can you ensure that the frontend handles missing/invalid data returned from the APIs without crashing?
    - I incorporated handling if missing and invalid data was present such as when price was unknown for a medicine it would display Prics is Unknown and vice versa for name if it was None.
3)You can send data to the backend via the available API(s), however it is not particularly user-friendly. How will you create a user-friendly solution that allows users to input data on the site and send it to the backend?
    - This objective I worked on the style.css file makeing it much clearer and easier to understand for the user by having a seperated side for the table of medicines and one side for all the different requests and buttons.
    - Hence as part of making a user-friendly solution I incorpoated buttons and input boxes so that it is much more user friendly
    to communicate with the backend.

4)The boss has asked me for a quarterly report. Can you create a backend function for averaging prices of all our medicines?
    - I completed this objective last as it was a optional task and so it was very vital for me to understand and complete the 
    compulsory objectives before.

Having gone over the overview for the challenge I noticed the vast majority of what was needed to solve the challenge would be work on the front end which consisted of JavaScript in the form of script.js and web technologies such as HTML and CSS as part of the structure and looks of the webpage.

As someone, who knows JavaScript is not his most experienced language I needed to get a little recap within the syntax and the use of JavaScript within this project where frameworks where not being used which I am familiar with a bit more.

To combat this lack of knowledge I utilised https://www.w3schools.com/js/ to recap the syntax for JavaScript as well as 
https://www.w3schools.com/html/ for html and https://www.w3schools.com/css/ for css.

I also utilised liveweave.com so i could see realtime updates to the layout of the webpage.

## Objectives - Innovative Solutions
So for handling missing and invalid data i used ternary operator : ? to handle in case if the price or name of medicine was null/invalid it would handle it accordingly displaying to the user. 
Additionally handling errors in the front-end was something I had to keep going back and forth. In the end i understood that the backend returns a message if successful in the request otheriwse a error so I utilised the existing code to handle errors and display to the user in the form of an alert which i thought was intuitive.


## Evaluation
The challenge was a really good task. I thoroughly enjoyed and I think it is an excellent way to have a hands on display of your problem solving skills and I much prefer these kinds of techincal challenges as part of an interview. The back-end part was definietly much smooother so incorporating the average price of medicine functions in main.py was less time consuming due to being more proficient in python and more experienced in the backend APIs. I spent time recapping JavaScript and HTML and CSS syntax resulting in taking longer time than expected but I enjoyed it as it was a good refreshing and learning experience.
If I was given more time I would look to incorporate more backend functionality and possible utilise a SQL database to store data and create a relational database if given more data. This would allow me to filter for certain criteria and request specific queries given a much larger range of data. Additionally I would have spent much more time on my frontend making it much more sleeker and asthetically pleasing for the user however it is very user-friendly at the moment so it ticks of the objective regardless.
