import type { Commit } from 'vuex'
import type { IEmployeeState, IFetchEmployeesPayload, IEmployee } from '@/types/employee'
import { $host } from '@/api'

const state = (): IEmployeeState => ({
  employeeList: [],
  employee: null,
  employeesById: [],
  employeesByName: [],
  currentPage: 1,
  itemsPerPage: 4
})

const mutations = {
  SET_EMPLOYEE_LIST(state: IEmployeeState) {
    const users = [...state.employeesById, ...state.employeesByName]
    const uniqueSet = new Set(users.map((item) => JSON.stringify(item)))
    state.employeeList = Array.from(uniqueSet).map((item) => JSON.parse(item))
  },

  SET_CLEAR_EMPLOYEE_LIST(state: IEmployeeState) {
    state.employeeList = []
  },

  SET_EMPLOYEE_BYID(state: IEmployeeState, payload: IEmployee[]) {
    if (state.employeeList) {
      state.employeesById = payload
    }
  },

  SET_EMPLOYEE_BYNAME(state: IEmployeeState, payload: IEmployee[]) {
    if (state.employeeList) {
      state.employeesByName = payload
    }
  },

  SET_EMPLOYEE(state: IEmployeeState, payload: IEmployee) {
    state.employee = payload
  },

  SET_CURRENT_PAGE(state: IEmployeeState, payload: number) {
    state.currentPage = payload
  }
}

const actions = {
  async FETCH_EMPLOYEES({ commit }: { commit: Commit }, payload: IFetchEmployeesPayload) {
    try {
      if (payload.searchById.length && payload.searchByName.length) {
        const [responseById, responseByName] = await Promise.allSettled([
          $host.get(`/users?${payload.searchById}`, {}),
          $host.get(`/users?${payload.searchByName}`, {})
        ])
        const byId = responseById.status === 'fulfilled' ? responseById.value.data : []
        const byName = responseByName.status === 'fulfilled' ? responseByName.value.data : []

        commit('SET_EMPLOYEE_BYID', byId)
        commit('SET_EMPLOYEE_BYNAME', byName)
      } else if (payload.searchById.length || payload.searchByName.length) {
        const { data } = await $host.get(`/users?${payload.searchById}${payload.searchByName}`)
        commit('SET_EMPLOYEE_BYNAME', payload.searchById.length ? [] : data)
        commit('SET_EMPLOYEE_BYID', payload.searchById.length ? data : [])
      } else {
        commit('SET_EMPLOYEE_BYID', [])
        commit('SET_EMPLOYEE_BYNAME', [])
      }
    } catch (e) {
      // console.log(e)
    } finally {
      commit('SET_EMPLOYEE_LIST')
    }
  }
}

const getters = {
  GET_EMPLOYEE_LIST(state: IEmployeeState) {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage
    const endIndex = startIndex + state.itemsPerPage
    return state.employeeList.slice(startIndex, endIndex)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
