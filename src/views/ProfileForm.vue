<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator/FormGenerator.vue'

const formData = ref({
  name: '',
  age: '18-25',
  bio: '',
  newsletter: true
})

const formConfig = {
  name: {
    type: 'input',
    label: 'Полное имя',
    attrs: { 
      placeholder: 'Иван Иванов',
      required: true
    }
  },
  age: {
    type: 'select',
    label: 'Возрастная группа',
    options: [
      { value: '18-25', label: '18-25 лет' },
      { value: '26-35', label: '26-35 лет' },
      { value: '36+', label: '36 и старше' }
    ]
  },
  bio: {
    type: 'textarea',
    label: 'Биография',
    attrs: {
      rows: 5,
      maxlength: 500
    }
  },
  newsletter: {
    type: 'checkbox',
    label: 'Подписаться на рассылку'
  }
}

const handleSubmit = () => {
  alert('Профиль обновлен: ' + JSON.stringify(formData.value))
}

const handleCancel = () => {
  formData.value = { 
    name: '', 
    age: '18-25', 
    bio: '', 
    newsletter: true 
  }
}
</script>

<template>
  <div class="profile-container">
    <h2>Редактирование профиля</h2>
    <FormGenerator
      :fields="formConfig"
      v-model="formData"
      @save="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<style lang="scss" scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 2rem;
  }
}
</style> 