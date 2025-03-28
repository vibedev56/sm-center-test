<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator/FormGenerator.vue'

const formData = ref({
  productName: '',
  description: '',
  price: '',
  inStock: true,
  category: ''
})

const formSchema = {
  productName: {
    type: 'input' as const,
    label: 'Название товара',
    attrs: {
      placeholder: 'Введите название',
      required: true
    }
  },
  description: {
    type: 'textarea' as const,
    label: 'Описание',
    attrs: {
      rows: 3
    }
  },
  price: {
    type: 'input' as const,
    label: 'Цена',
    attrs: {
      type: 'number',
      min: 0,
      step: 0.01
    }
  },
  inStock: {
    type: 'checkbox' as const,
    label: 'Доступен для заказа'
  },
  category: {
    type: 'select' as const,
    label: 'Категория',
    options: [
      { value: 'electronics', label: 'Электроника' },
      { value: 'books', label: 'Книги' },
      { value: 'clothing', label: 'Одежда' }
    ]
  }
}

const handleSubmit = () => {
  alert('Данные товара сохранены:\n' + JSON.stringify(formData.value, null, 2))
}

const handleCancel = () => {
  formData.value = {
    productName: '',
    description: '',
    price: '',
    inStock: true,
    category: ''
  }
}
</script>

<template>
  <div class="demo-container">
    <h1>Добавление товара</h1>
    <FormGenerator
      :form-schema="formSchema"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
      submit-button-text="Сохранить товар"
      cancel-button-text="Очистить форму"
    >
      <template #form-header>
        <p class="form-description">Заполните информацию о товаре для добавления в каталог.</p>
      </template>
      
      <template #input-price="{ field, formData }">
        <div class="price-input">
          <input
            type="number"
            v-model="formData.price"
            v-bind="field.attrs"
            id="price"
          />
          <span class="currency">₽</span>
        </div>
      </template>
    </FormGenerator>
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

.form-description {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

.price-input {
  position: relative;
  
  input {
    width: 100%;
    padding-right: 2rem;
  }
  
  .currency {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
}
</style> 