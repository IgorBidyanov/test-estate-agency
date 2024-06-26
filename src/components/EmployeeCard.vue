<template>
  <article
    class="employeeCard"
    :class="[{ 'employeeCard--selected': employee.id === choosenEmployee?.id }]"
    @click="chooseEmployee"
  >
    <img src="@/assets/images/small.png" class="employeeCard__img" alt="Фото сотрудника" />

    <div class="employeeCard__info">
      <h3 class="employeeCard__info-name">{{ employee.name }}</h3>

      <a class="employeeCard__info-mail" href="mailto:">{{ employee.email }}</a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { IEmployee } from '@/types/employee'
import { computed } from 'vue'
import { useStore } from '@/store'

interface IProps {
  employee: IEmployee
}

const store = useStore()

const props = defineProps<IProps>()

const choosenEmployee = computed(() => store.state.employees.employee)

const chooseEmployee = () => {
  store.commit('employees/SET_EMPLOYEE', props.employee)
}
</script>

<style scoped lang="scss">
.employeeCard {
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background: $white;
  overflow: hidden;

  &--selected {
    outline: 1px solid #e0e0e0;

    .employeeCard__info {
      background-color: #e0e0e0;
    }
  }

  &__img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }

  &__info {
    flex: 1;
    padding: 16px 15px 18px;

    &-name {
      font: {
        weight: 600;
        size: 14px;
      }
      line-height: 17px;
      color: $black;
    }

    &-mail {
      font: {
        weight: 400;
        size: 14px;
      }
      line-height: 17px;
      color: $gray;
    }
  }
}
</style>
