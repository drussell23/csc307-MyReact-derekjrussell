const express = require('express'); // Imported the Express module. 
const app = express(); // Create an instance of Express and define a constant to represent the port number.
const port = 5003;

const router = express.Router()
let users_list = []


// This will allow our backend to respond to calls coming from a different origin.
const cors = require('cors');
app.use(cors());

app.use(express.json()); // Set up our express app to process incoming data in JSON format.

// Set up our first API endpoint with the app.get function. 
// This sets the endpoint to accept http GET requests.
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    if (job != undefined){
       let result = findUserByJob(job);
       result = {users_list: result};
       res.send(result);
   }
    else{
         res.send(users);
    }
 });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
    users_list:
        [
            {
                id: 'xyz789',
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                id: 'abc123',
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                id: 'ppp222',
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
    const name = req.query.name;

    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users['users_list'].filter((user) => user['name'] === name);
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = { users_list: result };
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find((user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// app.post('/users', (req, res) => {
//     const userToAdd = req.body;
//     addUser(userToAdd);
//     res.status(200).send(userToAdd);
// });

function addUser(user) {
    user.id = generateId();
    console.log(user);
    users['users_list'].push(user);
}

// (1.) - Implement a hard delete operation to remove a particular user by id from the list.
/*
    This function takes in two arguments: a 'userId' and a 'userList' (an array of user objects).
    It uses a for-loop to iterate through the userList and compares each user's ID property with 
    the given userId. If a match is found, the 'splice()' method is used to remove that user 
    object from the userList array. The updated userList array is then returned. This function
    checks whether the userId exists in the list or not and returns "User not found!" if the 
    userId is not in the list. 
*/
// function heardDeleteUser(userId, userList) 
// {
//     for (let i = 0; i < userList.length; i++) 
//     {
//         if (userList[i].id == userId)
//             userList.splice(i, 1);
//         return userList;
//     }
//     return "User not found!";
// }
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    deleteUser(id);
    res.status(200).end();
    });
    
    function deleteUser(id){
    const index = users['users_list'].findIndex(user => user.id === id);
        if (index !== -1) {
        users['users_list'].splice(index, 1);
            }
    }

// (2.) - Implement an additional action to get all users that match a given name and a given job.  
/* 
    This function takes in three arguments: a 'name', a 'job', and a 'userList' (an array of user
    objects). It uses a for-loop to iterate through the userList and compares each user's name and
    job properties with the given name and job. If both match, the user is added to the 
    matchingUsers array. The function returns the array of matching users.
*/
function getMatchingUsers(name, job, userList) 
{
    let matchingUsers = [];

    for (let i = 0; i < userList.length; i++) 
    {
        if (userList[i].name === name && userList[i].job === job)
        {
            matchingUsers.push(userList[i]);
        }
    }
    return matchingUsers;
}

/*
    6 - Evolving the code taking your own steps
    -------------------------------------------

    2.) If you noticed, in the backend we use IDs while in the front we don't. We're sending the 
        objects without the ID field. They can be successfully inserted in the data structure, but 
        now we want them with the IDs. Let the backend decide what is the right ID to the object. 
        Implement an ID generator function to generate a random ID and assign it to the new object 
        that comes through the API post route. So, before appending a new user to the users_list 
        you will add the ID field with a random ID. With that, the list won't have objects without 
        unique IDs anymore.
*/
/* 
    The generated function generates a random string of characters using 
    Math.random() and the toString() method. 
*/
function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/*
    In the post route, when a new user comes via the API, it assigns the new user object
    the random ID generated by the function and pushes the new object into the users_list.

*/
app.post('/users', (req, res) => {
    const newUser = req.body;
    addUser(newUser);
    console.log(req.body);
    // newUser.id = generateId();
    users_list.push(newUser);
    res.status(201).send(newUser);
});



