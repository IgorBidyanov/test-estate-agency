<template>
  <Header />

  <main class="main">
    <Sidebar />

    <EmployeeInfo v-if="employee" />

    <p v-else class="help-text">Выберите сотрудника, чтобы посмотреть его профиль</p>
  </main>

  <Preloader v-if="preloader" />
</template>

<script setup lang="ts">
import Header from '@/components/HeaderApp.vue'
import Sidebar from '@/components/SidebarApp.vue'
import EmployeeInfo from '@/components/EmployeeInfo.vue'
import { useStore } from './store'
import { computed } from 'vue'
import Preloader from '@/components/PreloaderApp.vue'

const store = useStore()

const employee = computed(() => store.state.employees.employee)
const preloader = computed(() => store.state.loading)
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-grow: 1;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  .help-text {
    flex: 1;
    align-self: center;
    font: {
      size: 14px;
      weight: 400;
    }
    line-height: 17px;
    text-align: center;
    color: $gray;
  }
}
</style>
