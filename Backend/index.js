const express = require('express');
const app = express();
const {router} = require('./Router/CompetenceRoute');
const cors=require('cors');

// Définir le port
let Port = 4500;

app.use(express.json()); // Cela permet de traiter les données envoyées via POST en JSON





app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// Démarrer le serveur

  app.listen(Port, () => {
    console.log(`Le serveur fonctionne à l'adresse http://localhost:${Port}`);
  });


module.exports = app;
