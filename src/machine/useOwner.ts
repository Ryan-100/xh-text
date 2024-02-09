import { create } from 'zustand'

export interface IOwndata {
   id: string;
   access_token: string
   username : string
   __typename: string
} 

export interface BearState {
    userData: IOwndata 
    storeUserData : (by:IOwndata) => void
}

export const useOwnData= create<BearState>()((set) => ({
  userData : {
    id: '',
    access_token: '',
    username: '',
    __typename: ''
  } ,
  storeUserData: (userData)=>(set({userData})),
}))