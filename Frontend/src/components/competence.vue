<template>
    <main class="flex-1 font-sans pl-4 pt-2">
      <div class="max-w-7xl ml-8">
        <!-- Message d'erreur si présent -->
        <div v-if="error" class="bg-red-50 p-4 mb-6 border border-red-300 rounded text-red-700">
          {{ error }}
          <button @click="error = null" class="ml-2 font-bold">×</button>
        </div>
        
        <!-- Formulaire d'ajout/modification de compétence -->
        <div class="bg-white p-6 rounded shadow mb-8 max-w-2xl mx-auto">
          <h3 class="text-lg font-medium mb-4">{{ editingCompetenceId ? 'Modifier la compétence' : 'Ajouter une compétence' }}</h3>
          <form @submit.prevent="editingCompetenceId ? mettreAJourCompetence() : ajouterCompetence()" class="grid grid-cols-2 gap-4 items-end">
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                v-model="formCompetence.nomCompetence" 
                placeholder="Nom de la compétence" 
                required 
                class="border p-2 rounded w-full" />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <input 
                v-model="formCompetence.categorie" 
                placeholder="Catégorie (optionnel)" 
                class="border p-2 rounded w-full" />
            </div>
            <div class="col-span-1">
              <button 
                type="submit" 
                :disabled="isLoading"
                class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full disabled:opacity-50">
                {{ editingCompetenceId ? 'Mettre à jour' : 'Ajouter' }}
              </button>
            </div>
            <div v-if="editingCompetenceId" class="col-span-1">
              <button 
                type="button"
                @click="editingCompetenceId = null; formCompetence.nomCompetence = ''; formCompetence.categorie = ''"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded w-full">
                Annuler
              </button>
            </div>
          </form>
        </div>
  
        <!-- Tableau des compétences ajoutées -->
        <div class="bg-white rounded shadow max-w-7xl ml-8 mr-8">
          <h2 class="text-xl font-semibold p-4 border-b">Liste des compétences</h2>
          
          <!-- État de chargement -->
          <div v-if="isLoading && !competences.length" class="p-8 text-center text-gray-500">
            Chargement des compétences...
          </div>
          
          <!-- Message si aucune compétence -->
          <div v-else-if="!isLoading && !competences.length" class="p-8 text-center text-gray-500">
            Aucune compétence n'a été ajoutée. Utilisez le formulaire ci-dessus pour en ajouter.
          </div>
          
          <!-- Tableau des compétences -->
          <table v-else class="w-full text-sm">
            <thead class="bg-gray-100 text-left">
              <tr>
                <th class="p-3">Nom</th>
                <th class="p-3">Catégorie</th>
                <th class="p-3">Actions</th>
                <th class="p-3">Associer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="competence in competences" :key="competence.id_competence" class="border-t hover:bg-gray-50">
                <td class="p-3">{{ competence.nomCompetence }}</td>
                <td class="p-3">{{ competence.categorie || 'Non catégorisé' }}</td>
                <td class="p-3">
                  <button 
                    @click="modifierCompetence(competence)"
                    class="mr-2 text-blue-600 hover:text-blue-800">
                    Modifier
                  </button>
                  <button 
                    @click="supprimerCompetence(competence.id_competence)"
                    class="text-red-600 hover:text-red-800">
                    Supprimer
                  </button>
                </td>
                <td class="p-3">
                  <!-- Bouton associer si nécessaire -->
                  <button class="text-gray-600 hover:text-gray-800 disabled:opacity-50" disabled>
                    Associer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  // URL de base de l'API
  const API_BASE_URL = 'http://localhost:4500/api' 
  
  // Initialiser l'objet pour le formulaire
  const formCompetence = ref({
    nomCompetence: '',
    categorie: ''
  })
  
  // État pour stocker les compétences depuis le serveur
  const competences = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Charger les compétences depuis le serveur
  const fetchCompetences = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`${API_BASE_URL}/competence`)
      competences.value = response.data
    } catch (err) {
      console.error('Erreur lors du chargement des compétences:', err)
      error.value = 'Impossible de charger les compétences. Veuillez réessayer plus tard.'
    } finally {
      isLoading.value = false
    }
  }
  
  // Fonction pour ajouter une compétence
  const ajouterCompetence = async () => {
    if (formCompetence.value.nomCompetence) {
      isLoading.value = true
      
      try {
        const response = await axios.post(`${API_BASE_URL}/competence`, {
          nomCompetence: formCompetence.value.nomCompetence,
          categorie: formCompetence.value.categorie || 'Non catégorisé'
        })
        
        // Ajouter la nouvelle compétence à la liste locale
        competences.value.push(response.data)
        
        // Réinitialiser le formulaire
        formCompetence.value.nomCompetence = ''
        formCompetence.value.categorie = ''
        
      } catch (err) {
        console.error('Erreur lors de l\'ajout de la compétence:', err)
        error.value = 'Impossible d\'ajouter la compétence. Veuillez réessayer.'
      } finally {
        isLoading.value = false
      }
    }
  }
  
  // Fonction pour supprimer une compétence
  const supprimerCompetence = async (idC) => {
    try {
      await axios.delete(`${API_BASE_URL}/competence/${idC}`)
      // Mettre à jour la liste locale
      competences.value = competences.value.filter(c => c.id_competence !== idC)
    } catch (err) {
      console.error('Erreur lors de la suppression de la compétence:', err)
      error.value = 'Impossible de supprimer la compétence. Veuillez réessayer.'
    }
  }
  
  // Variable pour stocker l'ID de la compétence en cours de modification
  const editingCompetenceId = ref(null)
  
  // Fonction pour commencer l'édition d'une compétence
  const modifierCompetence = (competence) => {
    // Remplir le formulaire avec les valeurs de la compétence
    formCompetence.value.nomCompetence = competence.nomCompetence
    formCompetence.value.categorie = competence.categorie || ''
    // Stocker l'ID pour l'utiliser lors de la mise à jour
    editingCompetenceId.value = competence.id_competence
  }
  
  // Fonction pour mettre à jour une compétence
  const mettreAJourCompetence = async () => {
    if (!editingCompetenceId.value) {
      return ajouterCompetence()
    }
    
    try {
      const response = await axios.put(`${API_BASE_URL}/competence/${editingCompetenceId.value}`, {
        nomCompetence: formCompetence.value.nomCompetence,
        categorie: formCompetence.value.categorie || 'Non catégorisé'
      })
      
      // Mettre à jour la compétence dans la liste locale
      const index = competences.value.findIndex(c => c.id_competence === editingCompetenceId.value)
      if (index !== -1) {
        competences.value[index] = response.data
      }
      
      // Réinitialiser le formulaire et l'ID d'édition
      formCompetence.value.nomCompetence = ''
      formCompetence.value.categorie = ''
      editingCompetenceId.value = null
      
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la compétence:', err)
      error.value = 'Impossible de mettre à jour la compétence. Veuillez réessayer.'
    }
  }
  
  // Charger les compétences au montage du composant
  onMounted(() => {
    fetchCompetences()
  })
  </script>
  
  <style scoped>
  table button {
    background: none;
    border: none;
    color: #2563eb;
    font-weight: 500;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #2563eb;
  }
  </style>