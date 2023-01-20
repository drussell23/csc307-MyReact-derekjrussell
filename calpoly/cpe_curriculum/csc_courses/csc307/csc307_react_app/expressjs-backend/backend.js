const express = require('express'); // Imported the Express module. 
const app = express(); // Create an instance of Express and define a constant to represent the port number.
const port = 5003; 

app.use(express.json()); // Set up our express app to process incoming data in JSON format.

// Set up our first API endpoint with the app.get function. 
// This sets the endpoint to accept http GET requests.
app.get('/', (req, res) => 
{
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 app.get('/users', (req, res) => {
    res.send(users);
 })