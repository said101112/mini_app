const createUserValidationSchema = {
    cin: {
      isString: true,
      notEmpty: {
        errorMessage: "Le CIN ne doit pas être nul",
      },
    },
    Nom: {
      isString: true,
      notEmpty: {
        errorMessage: "Le nom ne doit pas être nul",
      },
    },
    Prenom: {
      isString: true,
      notEmpty: {
        errorMessage: "Le prénom ne doit pas être nul",
      },
    },
    Age: {
      isInt: {
        errorMessage: "L'âge doit être un nombre entier",
      },
      notEmpty: {
        errorMessage: "L'âge ne doit pas être nul",
      },
      toInt: true, 
    },
  };
  
  module.exports = createUserValidationSchema;
  