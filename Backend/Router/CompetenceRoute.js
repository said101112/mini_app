const express=require('express');
const { getAllCompetence, CreateCompetence, deleteCompetence, updateCompetence }=require('../controllers/CompetenceControllers');
const router=express.Router();


router.get('/api/competence',getAllCompetence);
router.post('/api/competence',CreateCompetence);
router.delete('api/competence/:id',deleteCompetence);
router.put('api/competence/:id',updateCompetence);

module.exports = { router }

