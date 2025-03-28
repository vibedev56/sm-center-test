<script setup lang="ts">
import { ref, computed } from 'vue'
import FormGenerator from '../components/FormGenerator/FormGenerator.vue'

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  rating: '',
  attachFile: false
}

const formData = ref({ ...initialState })

const isFormFilled = computed(() => 
  Object.entries(formData.value).some(([key, value]) => {
    if (key === 'attachFile') return value === true
    return value !== ''
  })
)

const formSchema = {
  name: {
    type: 'input' as const,
    label: 'Ваше имя',
    attrs: {
      placeholder: 'Введите имя',
      required: true
    }
  },
  email: {
    type: 'input' as const,
    label: 'Email',
    attrs: {
      placeholder: 'example@mail.ru',
      type: 'email',
      required: true
    }
  },
  subject: {
    type: 'select' as const,
    label: 'Тема обращения',
    attrs: {
      required: true
    },
    options: [
      { value: 'feedback', label: 'Отзыв о продукте' },
      { value: 'support', label: 'Техническая поддержка' },
      { value: 'partnership', label: 'Сотрудничество' },
      { value: 'other', label: 'Другое' }
    ]
  },
  message: {
    type: 'textarea' as const,
    label: 'Сообщение',
    attrs: {
      placeholder: 'Напишите ваше сообщение',
      rows: 5,
      required: true
    }
  },
  rating: {
    type: 'select' as const,
    label: 'Оценка качества',
    options: [
      { value: '5', label: 'Отлично' },
      { value: '4', label: 'Хорошо' },
      { value: '3', label: 'Удовлетворительно' },
      { value: '2', label: 'Плохо' },
      { value: '1', label: 'Очень плохо' }
    ]
  },
  attachFile: {
    type: 'checkbox' as const,
    label: 'Прикрепить файл к обращению'
  }
}

const selectedFile = ref<File | null>(null)

const handleSubmit = () => {
  setTimeout(() => {
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.')
    resetForm()
  }, 500)
}

const handleCancel = () => {
  if (isFormFilled.value) {
    if (confirm('Вы уверены, что хотите очистить форму?')) {
      resetForm()
    }
  } else {
    resetForm()
  }
}

const resetForm = () => {
  formData.value = { ...initialState }
  selectedFile.value = null
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
  }
}
</script>

<template>
  <div class="feedback-container">
    <div class="feedback-header">
      <h1>Обратная связь</h1>
      <p>Мы ценим ваше мнение! Заполните форму, чтобы связаться с нами.</p>
    </div>
    
    <FormGenerator
      :form-schema="formSchema"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
      submit-button-text="Отправить"
      cancel-button-text="Очистить"
    >
      <template #field-attachFile="{ field }">
        <div class="file-upload-field">
          <div class="checkbox-container">
            <label class="checkbox-label">
              <input 
                type="checkbox"
                v-model="formData.attachFile"
              />
              <span>Прикрепить файл</span>
            </label>
          </div>
          
          <div v-if="formData.attachFile" class="file-input-container">
            <input 
              type="file" 
              class="file-input" 
              @change="handleFileChange"
            />
            <p v-if="selectedFile" class="file-info">
              Выбран файл: {{ selectedFile.name }} ({{ (selectedFile.size / 1024).toFixed(1) }} KB)
            </p>
            <p v-else class="file-help">Максимальный размер файла: 5 МБ</p>
          </div>
        </div>
      </template>
      
      <template #form-footer>
        <div class="form-info">
          <p>* — обязательные поля</p>
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-button">Отправить</button>
          <button type="button" @click="handleCancel" class="cancel-button">Очистить</button>
        </div>
      </template>
    </FormGenerator>
  </div>
</template>

<style lang="scss" scoped>
.feedback-container {
  max-width: 650px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.feedback-header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #42b883;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
  }
}

.file-upload-field {
  margin: 1rem 0;
  
  .checkbox-container {
    margin-bottom: 0.5rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
  
  .file-input-container {
    margin-top: 0.5rem;
    padding: 1rem;
    border: 1px dashed #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;
  }
  
  .file-input {
    width: 100%;
  }
  
  .file-help,
  .file-info {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #888;
  }
  
  .file-info {
    color: #42b883;
    font-weight: 500;
  }
}

.form-info {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #888;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  
  button {
    padding: 0.6rem 1.8rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    
    &:active {
      transform: translateY(1px);
    }
  }
  
  .submit-button {
    background-color: #42b883;
    color: white;
    
    &:hover {
      background-color: #359c6d;
    }
    
    &:active {
      background-color: #2c7a56;
    }
  }
  
  .cancel-button {
    background-color: #f0f0f0;
    color: #333;
    
    &:hover {
      background-color: #e0e0e0;
    }
    
    &:active {
      background-color: #d0d0d0;
    }
  }
}
</style> 