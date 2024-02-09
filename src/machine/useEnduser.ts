import { create } from 'zustand'

export type IEndUserList = {
    active: number
    id:string
    username:string
    fullname:string
    address:string
    is_room:number
    send_count:number
}

export interface BearState {
    chatList: IEndUserList[]
    storeChatList : (by:IEndUserList[]) => void
}

export const useEndUser = create<BearState>()((set) => ({
  chatList : [],
  storeChatList: (chatList:IEndUserList[])=>(set({chatList})),
}))