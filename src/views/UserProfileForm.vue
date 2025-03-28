<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator/FormGenerator.vue'

const formData = ref({
  fullName: '',
  email: '',
  bio: '',
  newsletter: false,
  country: ''
})

const formSchema = {
  fullName: {
    type: 'input' as const,
    label: 'Полное имя',
    attrs: {
      placeholder: 'Введите ваше имя',
      required: true
    }
  },
  email: {
    type: 'input' as const,
    label: 'Email',
    attrs: {
      type: 'email',
      placeholder: 'example@mail.com',
      required: true
    }
  },
  bio: {
    type: 'textarea' as const,
    label: 'О себе',
    attrs: {
      rows: 4,
      maxlength: 500
    }
  },
  newsletter: {
    type: 'checkbox' as const,
    label: 'Подписаться на рассылку'
  },
  country: {
    type: 'select' as const,
    label: 'Страна',
    attrs: { required: true },
    options: [
      { value: 'ru', label: 'Россия' },
      { value: 'by', label: 'Беларусь' },
      { value: 'kz', label: 'Казахстан' }
    ]
  }
}

const handleSubmit = () => {
  alert('Форма отправлена:\n' + JSON.stringify(formData.value, null, 2))
}

const handleCancel = () => {
  formData.value = {
    fullName: '',
    email: '',
    bio: '',
    newsletter: false,
    country: ''
  }
}
</script>

<template>
  <div class="demo-container">
    <h1>Профиль пользователя</h1>
    <FormGenerator
      :form-schema="formSchema"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<style lang="scss" scoped>
.demo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}
</style> 