import { create } from 'zustand'

interface Exchange {
  id: string
  name: string
  image: string
}

interface ExchangeState {
  exchangeList: Exchange[]
  setExchangeList: (data: Exchange[]) => void
}

const initialData: Exchange[] = []

const useExchangesStore = create<ExchangeState>(set => ({
  exchangeList: initialData,
  setExchangeList: data => set({ exchangeList: data })
}))

export default useExchangesStore
