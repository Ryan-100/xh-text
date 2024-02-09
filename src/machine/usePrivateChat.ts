import { create } from "zustand";

type IEndUserList = {
  active: number;
  id: string;
  username: string;
  fullname: string;
  address: string;
  is_room: number;
  send_count: number;
};

export interface BearState {
  chatUser: IEndUserList;
  storeChatUser: (by: IEndUserList) => void;
}

export const usePrivateChat = create<BearState>()((set) => ({
  chatUser: {
    active: 0,
    id: "",
    username: "",
    fullname: "",
    address: "",
    is_room: 0,
    send_count: 0,
  },
  storeChatUser: (chatUser) => set({ chatUser }),
}));
