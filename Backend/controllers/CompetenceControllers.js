const pool = require('../db');
 

const CreateCompetence= async(req,res)=>{
  const { nomCompetence , categorie }=req.body;
      if(!nomCompetence,!categorie){
         res.status(400).json({msg:'tous les champs sont requis !!!'});
      }
      try{

       await pool.query('INSERT INTO Competence values($1,$2)',[nomCompetence,categorie]);
       res.status(200).json({msg:'Competence est cree avec succes .'})

      }catch(err){
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur lors de la création de la competence' });
      }
}
const updateCompetence = async (req, res) => {
  const { idC } = req.params;
    const { nomCompetence, categorie } = req.body;

    if (!idC) {
        return res.status(400).json({ message: "ID de la compétence est requis" });
    }
    try{
    const response = await pool.query('UPDATE Competence SET nomCompetence=$1, categories=$2 WHERE idC=$3', [nomCompetence,categorie, idC]);

    if (response.rowCount === 0) {
        return res.status(404).json({ message: "Compétence non trouvée" });
    }

    return res.status(201).json({ message: "Compétence mise à jour avec succès" });
    }catch(err){
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur lors de la mise a jour de la competence' });
      }
};
const deleteCompetence = async(req,res)=>{
  const { idC } = req.params ;
    
    if (!idC) {
        return res.status(400).json({ message: "Id de la compétence est requis" });
    }
    try{
    await pool.query('delete from Compétence where idC=$1',[idC]);
    res.status(200).json({msg:'Compétence est supprimée avec succès'});
    }catch(err){
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur lors de la mise a jour de la competence' });
      }
}


 const getAllCompetence= async(req,res)=>{
  try{
    await pool.query('select * from Competence');
    res.status(200).json({msg:'Compétences récuperées avec succès'});
  }catch(error){
    return res.status(500).json({ error: 'Erreur lors de la récuperation des compétences' });
  } 
}

module.exports={CreateCompetence,updateCompetence,deleteCompetence,getAllCompetence};