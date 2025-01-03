import { create } from 'zustand'

interface TelegramData {
  connectionStatus: boolean
  openAuthDialog: boolean
  fullname: string | null
  username: string | null
  profilePhoto: string | null
}

interface TelegramState {
  telegramData: TelegramData
  setTelegramData: (data: TelegramData) => void
  setOpenAuthDialog: (flag: boolean) => void
  setConnectionStatus: (flag: boolean) => void
}

const initialData: TelegramData = {
  connectionStatus: false,
  openAuthDialog: true,
  fullname: 'Someone From Nowhere',
  profilePhoto:
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg',
  username: 'Mr.Nobody'
}

const useTelegramStore = create<TelegramState>(set => ({
  telegramData: initialData,
  setTelegramData: data => set({ telegramData: data }),
  setOpenAuthDialog: flag =>
    set(state => ({
      telegramData: { ...state.telegramData, openAuthDialog: flag }
    })),
  setConnectionStatus: flag =>
    set(state => ({
      telegramData: { ...state.telegramData, connectionStatus: flag }
    }))
}))

export default useTelegramStore
