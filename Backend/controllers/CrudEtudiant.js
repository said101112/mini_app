const pool = require('../modules/db.js');
const { validationResult, matchedData } = require('express-validator');  
const checkSchema = require('../utils/validationSchemas.js'); 
const createUser = async (req, res) => {
    const { cin, Nom, Prenom,Age} = req.body;
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }
        const data = matchedData(req); 
        const result = await pool.query('INSERT INTO PERSONNE (cin, Nom, Prenom,Age) VALUES ($1, $2, $3,$4)', [data.cin, data.Nom, data.Prenom,data.Age]);
        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            result: result.rows[0], 
        });

    } catch (err) {
        console.error('Erreur lors de la création de lutilisateur:', err);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
const updateUser = async (req, res) => {
    const { Nom, Prenom, Age} = req.body;
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }
        const { cin } = req.params;
        const data = matchedData(req); 
        const result = await pool.query(
            'UPDATE PERSONNE SET Nom = $1, Prenom = $2, Age = $3 WHERE cin = $4',
            [data.Nom, data.Prenom, data.Age, cin]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({
            message: 'Utilisateur modifié avec succès',
        });

    } catch (err) {
        console.error('Erreur lors de la modification de lutilisateur:', err);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
const readUsers = async (req, res) => {
    try {
        const { cin } = req.params;
        let result;
        if (cin) {
            result = await pool.query('SELECT * FROM PERSONNE WHERE cin = $1', [cin]);
        } else {
            result = await pool.query('SELECT * FROM PERSONNE');
        }
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }

        return res.status(200).json({
            message: 'Utilisateurs récupérés avec succès',
            users: result.rows,  
        });

    } catch (err) {
        console.error('Erreur lors de l\'affichage:', err);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
const deleteUser = async (req, res) => {
    const { cin } = req.params;

    try {
        const result = await pool.query('SELECT * FROM PERSONNE WHERE cin = $1', [cin]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Cet utilisateur nest pas trouvé' });
        }
        await pool.query('DELETE FROM PERSONNE WHERE cin = $1', [cin]);

        return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });

    } catch (err) {
        console.error('Erreur lors de la suppression de lutilisateur:', err);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
module.exports={createUser,updateUser,readUsers,deleteUser}