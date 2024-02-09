
import uuid from 'react-uuid'

export type IShopDum = {
  id: string
  shopName: string
  startTime: string
  outTime: string
  AccountNumber: string
}

export type ICustomer = {
  id: string
  customerName: string
  lastMinute: string
  lastMessage: string
  image: string
}

export type IChatList = {
  type: string
  typeUser: string
  id: string
  customerImage: string
  shopAdminImage: string
  messageText: string
  image: string | string[]
}

export const colors = {
  'a': '#FF5733',
  'b': '#33FF57',
  'c': '#5733FF',
  'd': '#FF3366',
  'e': '#66FF33',
  'f': '#3366FF',
  'g': '#FF9933',
  'h': '#33FF99',
  'i': '#9933FF',
  'j': '#FF33CC',
  'k': '#CCFF33',
  'l': '#33CCFF',
  'm': '#FFCC33',
  'n': '#33FFCC',
  'o': '#CC33FF',
  'p': '#FF3300',
  'q': '#00FF33',
  'r': '#3300FF',
  's': '#FF6600',
  't': '#00FF66',
  'u': '#6600FF',
  'v': '#FF9900',
  'w': '#00FF99',
  'x': '#9900FF',
  'y': '#FFCC00',
  'z': '#00FFCC',
};


export const ChatListDummpy: IChatList[] = [
  {
    type: 'text',
    typeUser: 'customer',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    type: 'text',
    typeUser: 'shop',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    type: 'text',
    typeUser: 'shop',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    type: 'image',
    typeUser: 'customer',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image: [
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
      'https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',

    ],
  },
  {
    type: 'text',
    typeUser: 'shop',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    type: 'text',
    typeUser: 'customer',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    type: 'image',
    typeUser: 'shop',
    id: uuid().substring(0, 4),
    customerImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    shopAdminImage:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
    messageText: 'Hello Good Day Aung Kyaw Khaing',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
]


export const CustomerList: ICustomer[] = [
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image: '',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image: '',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image: '',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image: '',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image: '',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
  {
    id: uuid().substring(0, 4),
    customerName: 'Customer One',
    lastMinute: '10 : 00',
    lastMessage: 'How  are you',
    image:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
  },
]
