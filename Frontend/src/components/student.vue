
<template>
    <div class="container">
      <h1>Gestion des Étudiants</h1>
  
      <form @submit.prevent="onSubmit" class="form">
        <input v-model="form.nom" placeholder="Nom" required />
        <input v-model="form.prenom" placeholder="Prénom" required />
        <input v-model="form.cin" placeholder="CIN" required />
  
        <button type="submit">{{ isEditMode ? 'Modifier' : 'Ajouter' }}</button>
      </form>
  
      <table class="student-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>CIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="etudiant in students" :key="etudiant.cin">
            <td>{{ etudiant.nom }}</td>
            <td>{{ etudiant.prenom }}</td>
            <td>{{ etudiant.cin }}</td>
            <td>
              <button @click="editStudent(etudiant)">Modifier</button>
              <button @click="deleteStudent(etudiant.cin)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import axios from 'axios'
  
  const form = reactive({
    nom: '',
    prenom: '',
    cin: ''
  })
  
  const isEditMode = ref(false)
  const originalCin = ref('')
  const students = ref([])
  
  const getStudents = async () => {
    try {
      const res = await axios.get('http://localhost:4500/api/user/:cin?')
      students.value = res.data
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error)
    }
  }
  
  const addStudent = async () => {
    try {
      await axios.post('http://localhost:4500/api/user', form)
      await getStudents()
      resetForm()
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error)
    }
  }
  
  const updateStudent = async () => {
    try {
      await axios.put(`http://localhost:4500/api/user/:cin?`,{ data: { cin } })
      await getStudents()
      resetForm()
      isEditMode.value = false
    } catch (error) {
      console.error('Erreur lors de la modification:', error)
    }
  }
  
  const deleteStudent = async (cin) => {
    try {
      await axios.delete(`http://localhost:4500/api/user/:cin:?`, { data: { cin } })
      await getStudents()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }
  
  const editStudent = (etudiant) => {
    form.nom = etudiant.nom
    form.prenom = etudiant.prenom
    form.cin = etudiant.cin
    originalCin.value = etudiant.cin
    isEditMode.value = true
  }
  
  const resetForm = () => {
    form.nom = ''
    form.prenom = ''
    form.cin = ''
    originalCin.value = ''
  }
  
  const onSubmit = () => {
    if (isEditMode.value) {
      updateStudent()
    } else {
      addStudent()
    }
  }
  
  onMounted(getStudents)
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  input {
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  button {
    padding: 0.5rem;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
  }
  
  .student-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .student-table th,
  .student-table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: left;
  }
  
  .student-table th {
    background-color: #f2f2f2;
  }
  </style>