// import express from 'express';

const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const server = express();



let users = [
    {
        id: shortid.generate(),
        name:'Jane',
        bio: "Not Tarzan's Wife, another Jane"
    },
    {
        id: shortid.generate(),
        name:'Jane2',
        bio: "Tarzan's wife"
    },
    {
        id: shortid.generate(),
        name:'John',
        bio: "Tarzan's wife's boyfriend"
    },
    {
        id: shortid.generate(),
        name:'Tarzan',
        bio: "Jane's husband"
    },
    {
        id: shortid.generate(),
        name:'Zantar',
        bio: "Tarzan's wife's other boyfriend"
    },

];

//middleware

server.use(express.json());
server.use(cors());

//endpoints
server.get('/',(req,res) => {
  res.json({api: 'reunning.......'});
});

server.get('/api/users', (req,res) =>{
    res.json(users || res.status(500).json({ errorMessage: "The users information could not be retrieved." }));
})

server.get('/api/users/:id', (req,res) =>{
    const id = req.params.id;

    const user = users.find((user) => user.id == id)


    res.json(user || res.status(404).json({ message: "The user with the specified ID does not exist." }));
})

server.post('/api/users',(req,res) => {

  const { name, bio} = req.body;
  const newUser = { name, bio, id: shortid.generate() };
  if (!name || !bio) {
    res.json({errorMessage: "Please provide name and bio for the user."});
  }
  const findUserByName = user => {
    return user.name === name;
  };
  if (users.find(findUserByName)) {
      res.json({errorMessage: "That name already exists in the database" });
  }

  users.push(newUser);
  res.status(201).json(users);
  });

  server.delete('/api/users/:id', (req, res) => {
    if (!req.params.id)
  res.status(400).send("Your request is missing the user id");
  users = users.filter(user => `${user.id}` !== req.params.id);
  res.status(202).send(req.params.id);
  });

  server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
  const { name, bio} = req.body;
  const findUserById = user => {
    return user.id == id;
  };
  const foundUser = users.find(findUserById);
  if (!foundUser) {
    return sendUserError('No User found by that ID', res);
  } else {
    if (name) foundUser.name = name;
    if (bio) foundUser.bio = bio;
    res.status(200).send(users);
  }
  });

const port = 5000;
server.listen(port, () => console.log(`\n== server is running on port ${port} ==\n`))