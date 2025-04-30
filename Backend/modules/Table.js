const pool = require("./db.js")

// const variable12 = pool.query("SELECT now ();");

// pool.query(`DROP TABLE Personne_Competence;
//     DROP TABLE Competence;
//     DROP TABLE Personne`)

async function TableCreation(){
    await pool.query(`CREATE TABLE Personne (
        cin varchar(64) PRIMARY KEY, 
        Nom varchar(64), 
        Prenom varchar(64),
        Age Integer);`)

    await pool.query(`CREATE TABLE Competence (
        idC Integer PRIMARY KEY,
        nomCompetence varchar(64),
        categorie varchar(64));`)

    await pool.query(`CREATE TABLE Personne_Competence (
        idC Integer REFERENCES Competence(idC),
        CIN varchar(64) REFERENCES Personne(CIN),
        PRIMARY KEY (idC, CIN));`)
}

module.exports=TableCreation()

// await pool.query(`CREATE TABLE `)