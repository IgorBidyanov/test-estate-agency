<template>
  <header class="header">
    <h1 class="header__title">Жилфонд</h1>

    <span class="header__subtitle">Пользователь</span>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;

  &__title {
    font: {
      weight: 700;
      size: 32px;
    }
    color: $red;
  }

  &__subtitle {
    font: {
      weight: 400;
      size: 16px;
    }
    line-height: 19.5px;
    color: $dark-gray;
  }
}
</style>
