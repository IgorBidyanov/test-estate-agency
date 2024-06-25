<template>
  <div class="preloader">
    <img src="@/assets/images/preloader.gif" alt="Загрузка..." class="vPreloader__img" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
  flex-direction: column;
  &__img {
    width: 110px;
    height: 110px;
  }
}
</style>
