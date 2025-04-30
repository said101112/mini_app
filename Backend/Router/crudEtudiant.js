const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const createUserValidationSchema = require('../utils/validationSchemas.js');
const { createUser, updateUser, readUsers, deleteUser } = require('../controllers/CrudEtudiant.js');
router.post(
  '/api/user', checkSchema(createUserValidationSchema), createUser);
router.get('/api/user/:cin?', readUsers);
router.put(
  '/api/user/:cin',checkSchema(createUserValidationSchema),updateUser);
router.delete('/api/user/:cin', deleteUser);
module.exports = router;
