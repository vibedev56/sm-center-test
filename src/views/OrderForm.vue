<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator/FormGenerator.vue'

const formData = ref({
  customerName: '',
  phone: '',
  email: '',
  deliveryAddress: '',
  paymentMethod: '',
  comment: '',
  agreeToTerms: false
})

const formSchema = {
  customerName: {
    type: 'input' as const,
    label: 'ФИО',
    attrs: {
      placeholder: 'Иванов Иван Иванович',
      required: true
    }
  },
  phone: {
    type: 'input' as const,
    label: 'Телефон',
    attrs: {
      placeholder: '+7 (999) 123-45-67',
      type: 'tel',
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
  deliveryAddress: {
    type: 'textarea' as const,
    label: 'Адрес доставки',
    attrs: {
      placeholder: 'Город, улица, дом, квартира',
      rows: 2,
      required: true
    }
  },
  paymentMethod: {
    type: 'select' as const,
    label: 'Способ оплаты',
    attrs: {
      required: true
    },
    options: [
      { value: 'card', label: 'Банковская карта' },
      { value: 'cash', label: 'Наличные при получении' },
      { value: 'online', label: 'Онлайн-платеж' }
    ]
  },
  comment: {
    type: 'textarea' as const,
    label: 'Комментарий к заказу',
    attrs: {
      placeholder: 'Дополнительная информация по заказу',
      rows: 3
    }
  },
  agreeToTerms: {
    type: 'checkbox' as const,
    label: 'Я согласен с условиями обработки персональных данных'
  }
}

const handleSubmit = () => {
  if (!formData.value.agreeToTerms) {
    alert('Для оформления заказа необходимо согласиться с условиями')
    return
  }
  
  alert('Заказ успешно оформлен:\n' + JSON.stringify(formData.value, null, 2))
}

const handleCancel = () => {
  if (confirm('Вы уверены, что хотите отменить оформление заказа?')) {
    formData.value = {
      customerName: '',
      phone: '',
      email: '',
      deliveryAddress: '',
      paymentMethod: '',
      comment: '',
      agreeToTerms: false
    }
  }
}
</script>

<template>
  <div class="order-container">
    <h1>Оформление заказа</h1>
    
    <FormGenerator
      :form-schema="formSchema"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
      submit-button-text="Оформить заказ"
      cancel-button-text="Отменить"
    >
      <template #form-header>
        <div class="order-info">
          <h2>Информация о заказе</h2>
          <p>Пожалуйста, заполните все необходимые поля для оформления заказа</p>
        </div>
      </template>
      
      <template #field-agreeToTerms="{ field, formData }">
        <div class="terms-field">
          <label class="checkbox-label">
            <input 
              type="checkbox"
              v-model="formData.agreeToTerms"
              required
            />
            <span>
              Я согласен с <a href="#" class="terms-link">условиями обработки</a> персональных данных
            </span>
          </label>
        </div>
      </template>
    </FormGenerator>
  </div>
</template>

<style lang="scss" scoped>
.order-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.order-info {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  h2 {
    font-size: 1.2rem;
    color: #42b883;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
}

.terms-field {
  margin-top: 1.5rem;
  
  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    
    input {
      margin-top: 0.2rem;
    }
  }
  
  .terms-link {
    color: #42b883;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style> 