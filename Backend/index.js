const express = require('express');
const app = express();
const {router} = require('./Router/authRoute');
const cors=require('cors');
const cookieParser =require('cookie-parser');

// Définir le port
let Port = 4500;

app.use(cookieParser());

app.use(express.json()); // Cela permet de traiter les données envoyées via POST en JSON





app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Route d'authentification
app.use('/auth', router);


// Démarrer le serveur

  app.listen(Port, () => {
    console.log(`Le serveur fonctionne à l'adresse http://localhost:${Port}`);
  });


module.exports = app;
