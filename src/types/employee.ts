export interface IEmployee {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface IEmployeeState {
  employeeList: IEmployee[]
  employee: IEmployee | null
  employeesById: IEmployee[]
  employeesByName: IEmployee[]
  currentPage: number
  itemsPerPage: number
}

export interface IFetchEmployeesPayload {
  searchById: string
  searchByName: string
}
