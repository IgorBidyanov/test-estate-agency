import { type InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import employeesModule from './modules/employeesModule'
import type { IEmployeeState } from '@/types/employee'

export interface State {
  employees: IEmployeeState
  error: null | string
  loading: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    error: null,
    loading: false
  } as State,
  mutations: {
    SET_ERROR(state: State, payload: string | null) {
      state.error = payload
    },

    SET_LOADING(state: State, payload: boolean) {
      state.loading = payload
    }
  },
  actions: {},
  getters: {},
  modules: {
    employees: employeesModule
  }
})

export function useStore() {
  return baseUseStore(key)
}
