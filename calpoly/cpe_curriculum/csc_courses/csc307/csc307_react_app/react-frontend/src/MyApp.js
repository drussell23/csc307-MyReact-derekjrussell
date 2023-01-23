import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() 
{
    const [characters, setCharacters] = useState([]);

    /* 
        6 - Evolving the code taking your own steps
        -------------------------------------------

        1.) In the frontend, consider the code 201 rather than 200 as a successful insertion. 
            If the response doesn't come with a 201 status code, do not update the state on the 
            frontend which means no changes to the table. 
    */

    

    function updateList(person) 
    { 
        makePostCall(person).then( result => {
        if (result && result.status === 201)
        {}
    
        });
     }
     

    async function makePostCall(person)
    {
        try {
           const response = await axios.post('http://localhost:5003/users', person);
           setCharacters([...characters, response.data]);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
     }

    useEffect(() => {
        fetchAll().then( result => {
           if (result)
              setCharacters(result);
         });
     }, [] );
    

    /*
        So, our fetchAll function will use axios to make a get call to our /users GET 
        endpoint in our backend. And that's an await call, meaning it's a non-blocking 
        operation, thus allowing our frontend to run other threads if needed. 
    */
    async function fetchAll()
    {
        try 
        {
           const response = await axios.get('http://localhost:5003/users');
           return response.data.users_list;     
        }
        catch (error)
        {
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
    }
    
    function updateList(person) { 
        makePostCall(person).then( result => {
            if (result && result.status === 201){
            }  
        });
    }

    async function removeOneCharacter (index) {
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);

        const characterId = characters[index].id; 
        const response = await axios.delete(`http://localhost:5003/users/${characterId}`);

        if (response.status === 200) {
            console.log('Character with ID ${characterId} deleted successfully!');
        }
        if (response.status === 404) {
            console.log('Character with ID ${characterId} delete failed');
        }
    }

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    )
}
export default MyApp;