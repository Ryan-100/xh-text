import { create } from 'zustand'

export interface BearState {
   page: string
   changePage: (by:string) => void
}

export const usePageName = create<BearState>()((set) => ({
  page : 'dashboard ',
  changePage: (by)=>(set({page: by})),
}))