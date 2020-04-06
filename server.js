// import express from 'express';

const express = require('express');

const server = express();

const hubs = [
    {
        id: 1,
        name:'webs28',
        lessonId: 1,
        cohort: 'web28'
    },
    {
        id: 2,
        name:'webs28',
        lessonId: 1,
        cohort: 'web28'
    },
    {
        id: 3,
        name:'webs28',
        lessonId: 1,
        cohort: 'web28'
    },

];

//middleware
server.use(express.json());

//endpoints
server.get('/',(req,res) => {
  res.json({api: 'reunning.......'});
});

server.get('/api/hubs', (req,res) =>{
    res.json(hubs);
})

server.get('/api/hubs/:id', (req,res) =>{
    const id = req.params.id;

    const hub = hubs.find((hub) => hub.id == id)


    res.json(hub || res.status(404).json({message:"Shit aint here bruh"}));
})

server.post('/api/hubs',(req,res) => {
    const hubInfo = req.body;

    hubs.push(hubInfo);

    res.status(201).json(hubs);
  });

const port = 5000;
server.listen(port, () => console.log(`\n== server is running on port ${port} ==\n`))