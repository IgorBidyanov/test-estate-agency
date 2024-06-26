<template>
  <aside class="sidebar">
    <h2 class="sidebar__title">Поиск сотрудников</h2>

    <form class="sidebar__form" @submit.prevent>
      <input
        class="sidebar__input"
        type="text"
        placeholder="Введите Id или имя"
        v-model="searchValue"
        @input="search()"
      />

      <p v-if="error" class="sidebar__error">{{ error }}</p>
    </form>

    <h2 class="sidebar__title">Результаты</h2>

    <ul v-if="employeeList.length" class="sidebar__list">
      <li v-for="employee in employeeList" :key="employee.id">
        <EmployeeCard :employee="employee" />
      </li>
    </ul>

    <span v-else class="sidebar__text">начните поиск</span>

    <ul v-if="employeeList.length && totalPages.length > 1" class="sidebar__pagination-list">
      <li v-for="page in totalPages" :key="page">
        <button
          class="sidebar__pagination-btn"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import EmployeeCard from '@/components/EmployeeCard.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import type { IFetchEmployeesPayload } from '@/types/employee'
import { debounce } from 'lodash'

// store
const store = useStore()

// data
const searchValue = ref('')

// computed
const error = computed(() => store.state.error)
const currentPage = computed(() => store.state.employees.currentPage)
const itemsPerPage = computed(() => store.state.employees.itemsPerPage)
const choosenEmployee = computed(() => store.state.employees.employee)
const employeeList = computed(() => store.getters['employees/GET_EMPLOYEE_LIST'])

const searchQuery = computed(() => {
  const arr = searchValue.value.split(/\s*,\s*|\s+/)
  let idQuery = ''
  let nameQuery = ''
  arr.forEach((item) => {
    if (isNaN(parseFloat(item)) && item.length) {
      const name = item[0].toUpperCase() + item.toLowerCase().slice(1)
      nameQuery += `username=${name}&`
    } else if (!isNaN(parseFloat(item)) && item.length) {
      idQuery += `id=${item}&`
    }
  })
  return { searchById: idQuery.slice(0, -1), searchByName: nameQuery.slice(0, -1) }
})

const totalPages = computed(() => {
  const length = Math.ceil(store.state.employees.employeeList.length / itemsPerPage.value)
  return Array.from({ length }, (_, i) => i + 1)
})

const employeesId = computed(() =>
  store.state.employees.employeeList.map((employee) => employee.id)
)

// watch
watch(employeesId, async (newIds) => {
  if (choosenEmployee.value && !newIds.includes(choosenEmployee.value.id)) {
    store.commit('employees/SET_EMPLOYEE', null)
  }
})

// methods
const fetchEmployees = async (payload: IFetchEmployeesPayload) => {
  store.commit('SET_LOADING', true)
  store.commit('SET_ERROR', null)
  await store.dispatch('employees/FETCH_EMPLOYEES', payload)
  store.commit('SET_LOADING', false)
}

const search = debounce(() => fetchEmployees(searchQuery.value), 1000)

const changePage = async (page: number) => {
  store.commit('employees/SET_CURRENT_PAGE', page)
}
</script>

<style lang="scss">
%input-text {
  font: {
    family: 'Montserrat';
    weight: 400;
    size: 14px;
  }
  line-height: 17px;
  color: $gray;
}
.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 23%;
  max-width: 30%;
  padding: 28px 31px 28px 20px;
  border-right: 1px solid #dededd;
  background-color: $light-gray;

  &__title {
    margin-bottom: 21px;
    font: {
      weight: 600;
      size: 16px;
    }
    line-height: 22.4px;
    color: $black;
  }

  &__form {
    margin-bottom: 24px;
  }

  &__input {
    width: 100%;
    padding: 14px 15px 12px;
    border: 1.5px solid #e9ecef;
    border-radius: 5px;
    outline: none;
    @extend %input-text;

    &::placeholder {
      @extend %input-text;
    }
  }

  &__error {
    margin-top: 8px;
    font: {
      weight: 400;
      size: 10px;
    }
    text-indent: 6px;
    color: $red;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__text {
    @extend %input-text;
  }

  &__pagination-list {
    display: flex;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: auto;
    overflow-x: scroll;
    scrollbar-width: thin;
  }

  &__pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: 1.5px solid #e9ecef;
    border-radius: 50%;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  &__pagination-btn.active {
    background-color: $red;
    border-color: $red;
    color: $white;
  }
}
</style>
