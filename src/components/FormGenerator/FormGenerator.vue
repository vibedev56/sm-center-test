<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Option {
  value: string;
  label: string;
}

interface FormField {
  type: 'input' | 'select' | 'textarea' | 'checkbox';
  label?: string;
  attrs?: Record<string, any>;
  options?: Option[];
}

const props = defineProps<{
  formSchema: Record<string, FormField>
  modelValue: Record<string, any>
  submitButtonText?: string
  cancelButtonText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const buttonTexts = computed(() => ({
  submit: props.submitButtonText || 'Сохранить',
  cancel: props.cancelButtonText || 'Отмена'
}))

const safeClone = <T>(obj: T): T => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {
    console.warn('Ошибка клонирования объекта:', e)
    return { ...obj } as T
  }
}

const formData = ref(safeClone(props.modelValue))

let isUpdating = false
watch(
  formData,
  (newVal) => {
    if (!isUpdating) {
      emit('update:modelValue', safeClone(newVal))
    }
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (newVal) => {
    try {
      const currentJSON = JSON.stringify(formData.value)
      const newJSON = JSON.stringify(newVal)
      
      if (newJSON !== currentJSON) {
        isUpdating = true
        formData.value = safeClone(newVal)
        setTimeout(() => {
          isUpdating = false
        }, 0)
      }
    } catch (e) {
      console.warn('Ошибка сравнения объектов:', e)
      formData.value = { ...newVal }
    }
  },
  { deep: true, immediate: true }
)

const emitSubmit = () => emit('submit')
const emitCancel = () => emit('cancel')
</script>

<template>
  <form @submit.prevent="emitSubmit">
    <slot name="form-header" />
    
    <div v-for="(field, name) in formSchema" :key="name" class="form-field">
      <slot 
        :name="`field-${name}`" 
        :field="field" 
        :value="formData[name]"
        :formData="formData"
      >
        <div class="field-container">
          <slot :name="`label-${name}`" :field="field">
            <label v-if="field.label" :for="name">{{ field.label }}</label>
          </slot>
          
          <slot 
            :name="`input-${name}`" 
            :field="field" 
            :value="formData[name]"
            :formData="formData"
          >
            <template v-if="field.type === 'input'">
              <input
                v-model="formData[name]"
                v-bind="field.attrs"
                :id="name"
              />
            </template>
            
            <template v-else-if="field.type === 'select'">
              <select
                v-model="formData[name]"
                v-bind="field.attrs"
                :id="name"
              >
                <option value="" disabled selected>Выберите опцию</option>
                <option
                  v-for="option in field.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </template>
            
            <template v-else-if="field.type === 'textarea'">
              <textarea
                v-model="formData[name]"
                v-bind="field.attrs"
                :id="name"
              />
            </template>
            
            <template v-else-if="field.type === 'checkbox'">
              <label class="checkbox-label" :for="`checkbox-${name}`">
                <input
                  type="checkbox"
                  v-model="formData[name]"
                  v-bind="field.attrs"
                  :id="`checkbox-${name}`"
                />
                <span>{{ field.label }}</span>
              </label>
            </template>
          </slot>
        </div>
        
        <slot :name="`error-${name}`" />
      </slot>
    </div>
    
    <slot name="form-footer">
      <div class="form-actions">
        <slot name="actions">
          <slot name="submit-button">
            <button type="submit">{{ buttonTexts.submit }}</button>
          </slot>
          <slot name="cancel-button">
            <button type="button" @click="emitCancel">{{ buttonTexts.cancel }}</button>
          </slot>
        </slot>
      </div>
    </slot>
  </form>
</template>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input[type="text"],
  input[type="email"],
  input[type="number"],
  input[type="password"],
  input[type="tel"],
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    
    &:focus {
      outline: none;
      border-color: #42b883;
      box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
    }
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin: 0;
    }
  }
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;

    &[type="submit"] {
      background-color: #42b883;
      color: white;

      &:hover {
        background-color: #359c6d;
      }
      
      &:active {
        background-color: #2c7a56;
      }
    }

    &[type="button"] {
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
}
</style> 