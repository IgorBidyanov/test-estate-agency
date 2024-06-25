<template>
  <article class="employee">
    <img src="@/assets/images/big.png" class="employee__image" alt="Фото сотрудника" />

    <div class="employee__info">
      <h3 class="employee__name">{{ employee?.name }}</h3>

      <div class="employee__contact">
        <p class="employee__contact-item">
          <span class="employee__contact-label">email:</span>
          {{ employee?.email }}
        </p>
        <p class="employee__contact-item">
          <span class="employee__contact-label">phone:</span>
          {{ employee?.phone }}
        </p>
      </div>

      <div class="employee__about">
        <p class="employee__about-title">О себе:</p>
        <p class="employee__about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()

const employee = computed(() => store.state.employees.employee)
</script>

<style scoped lang="scss">
%employee__title {
  font: {
    weight: 600;
    size: 16px;
  }
  line-height: 140%;
  color: $black;
}

.employee {
  display: flex;
  flex-wrap: wrap;
  gap: 62px;
  padding: 30px 33px 30px 22px;
  max-width: 70%;
  height: fit-content;

  &__image {
    max-width: min(424px, 50%);
    object-fit: contain;
    object-position: top;
  }

  &__info {
    flex: 1;
    font-weight: 400;
    font-size: 14px;
    color: $gray;
  }

  &__name {
    @extend %employee__title;
    margin-bottom: 10px;
  }

  &__contact {
    margin-bottom: 20px;

    &-item {
      margin-bottom: 11px;
    }

    &-label {
      @extend %employee__title;
      display: inline-block;
      margin-right: 6px;
      font-size: 14px;
    }
  }

  &__about {
    &-title {
      @extend %employee__title;
      margin-bottom: 23px;
    }

    &-text {
      line-height: 17px;
    }
  }
}
</style>
