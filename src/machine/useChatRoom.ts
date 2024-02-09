import { create } from "zustand";

export type IChatRoom = {
  id?: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  image_urls: any
  link:  string;
  send_type: string;
  send_date?: Date;
  receiver_user?: {
    fullname: string;
    username: string;
  };
  sender_user?: {
    fullname: string;
    username: string;
  };
  is_read?: number;
  status?:string
};

export interface BearState {
  status: string;
  chatRoom: IChatRoom[];
  storeChatRoomData: (by: IChatRoom | IChatRoom[]) => void;
  changeStatus: (by: string) => void;
  clearStoreMessage: ()=>void
}

export const useChatRoom = create<BearState>()((set) => ({
  status: "pending",
  chatRoom: [],
  storeChatRoomData: (data: IChatRoom[] | IChatRoom) =>
    set((state) => {
      if (state.status === "query") {
        //@ts-ignore
        return { chatRoom: [...data] };
      } else if (state.status === "pending") {
        return { chatRoom: [...state.chatRoom,{...data,status:"pending"}] };
      } else if (state.status === "delivered") {
        return {
           //@ts-ignore
          chatRoom: [...data],
        };
      }
    }),
  changeStatus: (status: string) => set({ status }),
  clearStoreMessage: ()=> set({chatRoom: []})
}));
