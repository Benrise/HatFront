import { AppPages } from "@/router/router.types"


interface IRoute<T extends object = {}> {
  name: string
  params: T
}

export class AppRoutes {
  private constructor() {}
  static getHome() {
    return getRoute(AppPages.home, {})
  }
  static getLogin() {
    return getRoute(AppPages.login, {})
  }
  static getPromo() {
    return getRoute(AppPages.promo, {})
  }
}

function getRoute<T extends object = {}>(name: string, params: T): IRoute<T> {
  return {
    name,
    params
  }
}