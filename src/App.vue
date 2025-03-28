<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1 class="app-title">Демонстрация генератора форм</h1>
  </header>
  
  <nav>
    <RouterLink to="/profile">Профиль пользователя</RouterLink>
    <RouterLink to="/product">Добавление товара</RouterLink>
    <RouterLink to="/order">Оформление заказа</RouterLink>
    <RouterLink to="/feedback">Обратная связь</RouterLink>
  </nav>
  
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
header {
  background-color: #42b883;
  color: white;
  padding: 1rem 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .app-title {
    margin: 0;
    font-size: 1.5rem;
  }
}

nav {
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 1rem;
  justify-content: center;
  overflow-x: auto;
  
  a {
    color: #2c3e50;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    white-space: nowrap;
    
    &:hover {
      background-color: #e9ecef;
    }
    
    &.router-link-active {
      color: #42b883;
      font-weight: 500;
      border-bottom: 2px solid #42b883;
    }
  }
}

main {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

footer {
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  nav {
    flex-wrap: wrap;
    
    a {
      flex-basis: 50%;
      text-align: center;
    }
  }
}
</style>