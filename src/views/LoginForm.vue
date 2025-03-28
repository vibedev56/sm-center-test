<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator/FormGenerator.vue'

const formData = ref({
  email: '',
  password: '',
  remember: false
})

const formConfig = {
  email: {
    type: 'input',
    label: 'Email',
    attrs: {
      type: 'email',
      placeholder: 'Введите email'
    }
  },
  password: {
    type: 'input',
    label: 'Пароль',
    attrs: {
      type: 'password',
      placeholder: 'Введите пароль'
    }
  },
  remember: {
    type: 'checkbox',
    label: 'Запомнить меня'
  }
}

const handleSubmit = () => {
  console.log('Данные формы:', formData.value)
}

const handleCancel = () => {
  formData.value = { email: '', password: '', remember: false }
}
</script>

<template>
  <FormGenerator
    :fields="formConfig"
    v-model="formData"
    @save="handleSubmit"
    @cancel="handleCancel"
  />
</template> 