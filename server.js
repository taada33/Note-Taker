const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.status(200).json(db);
  });

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const {title, text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };

    fs.readFile(`./db/db.json`,'utf8', (err, data) => {
        if (err){
            console.log(err)
        }else{
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            const noteString = JSON.stringify(parsedData, null, 4);

            fs.writeFile(`./db/db.json`, noteString, (err) =>
                err
                ? console.error(err)
                : console.log(
                    `New note has been written to JSON file`
                )
            );
        }
    });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

  app.delete(`/api/notes/:id`, (req,res) =>{
    console.info(`${req.method} request received to add a note`);
    console.log(req.params);
  })




app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));