import { create } from 'zustand'

export type Channel = {
  id: number
  title: string
  username: any
  profilePhoto: string
}

type _1 = {
  channelsList: Channel[]
  selectedChannel: Channel | null
}

export type Message = {
  id: number
  messageId: number
  message: string
}

type _2 = {
  messagesList: Message[]
  selectedMessage: Message | null
}

export type SelectedText = {
  selectedText: string
  startIndex: number
  line: string
}

export type algorithmKeysType =
  | 'Symbol'
  | 'Market'
  | 'Position'
  | 'Leverage'
  | 'Entry Targets'
  | 'Take-Profit Targets'
  | 'StopLoss'

export const algorithmKeys: algorithmKeysType[] = [
  'Symbol',
  'Market',
  'Position',
  'Leverage',
  'Entry Targets',
  'Take-Profit Targets',
  'StopLoss'
]

export type purchaseVolumeType = { title: string; volume: number; isPercentage: boolean }
export const initialPurchaseVolume = { title: 'Purchase Volume ( $ Or % )', volume: 5, isPercentage: false }

export type algorithmName = { title: string; value: string }
export const initialAlgorithmName = { title: 'Algorithm name', value: '' }

export type AlgorithmType = {
  id: string
  selectedText: SelectedText | null
  algorithmicText: string | null
  usedAlgorithmKeys: algorithmKeysType[]
  purchaseVolume: purchaseVolumeType
  algorithmName: algorithmName
}

type _3 = {
  algorithmsList: AlgorithmType[]
  selectedAlgorithm: AlgorithmType
}

type _4 = AlgorithmType

export type Exchange = {
  id: string
  name: string
  image: string
}

export type UserExchanges = {
  exchangeId: string
  apiKey: string
  apiSecret: string
}

type _5 = {
  exchangesList: Exchange[]
  selectedExchange: Exchange | null
  userExchanges: UserExchanges[]
}

// ***** Initial values

const initial_1Value: _1 = {
  channelsList: [],
  selectedChannel: null
}

const initial_2Value: _2 = {
  messagesList: [],
  selectedMessage: null
}

export const initialAlgorithm: AlgorithmType = {
  id: '',
  selectedText: null,
  algorithmicText: null,
  usedAlgorithmKeys: [],
  purchaseVolume: initialPurchaseVolume,
  algorithmName: initialAlgorithmName
}

const initial_3Value: _3 = {
  algorithmsList: [],
  selectedAlgorithm: initialAlgorithm
}

const initial_4Value: _4 = initialAlgorithm

const initial_5Value: _5 = {
  exchangesList: [],
  selectedExchange: null,
  userExchanges: []
}

/// ***** Slice Data

export type Wizard = {
  step: number
  _1: _1
  _2: _2
  _3: _3
  _4: _4
  _5: _5
  _6: any
  _7: any
}

type WizardState = {
  wizardData: Wizard
  setStep: (step: number) => void
  set_1: (data: Wizard['_1']) => void
  set_2: (data: Wizard['_2']) => void
  set_3: (data: Wizard['_3']) => void
  set_4: (data: Wizard['_4']) => void
  set_5: (data: Wizard['_5']) => void
}

const initialData: Wizard = {
  step: 1,
  _1: initial_1Value,
  _2: initial_2Value,
  _3: initial_3Value,
  _4: initial_4Value,
  _5: initial_5Value,
  _6: {},
  _7: {}
}

const useTradingAlgorithmWizardStore = create<WizardState>(set => ({
  wizardData: initialData,
  setStep: step =>
    set(state => ({
      wizardData: {
        ...state.wizardData,
        step
      }
    })),
  set_1: data =>
    set(state => ({
      wizardData: {
        ...state.wizardData,
        _1: data
      }
    })),
  set_2: data =>
    set(state => ({
      wizardData: {
        ...state.wizardData,
        _2: data
      }
    })),
  set_3: data =>
    set(state => ({
      wizardData: {
        ...state.wizardData,
        _3: data
      }
    })),
  set_4: data =>
    set(state => ({
      wizardData: {
        ...state.wizardData,
        _4: data
      }
    })),
  set_5: data =>
    set(state => ({
      wizardData: {
        ...state.wizardData,
        _5: data
      }
    }))
}))

export default useTradingAlgorithmWizardStore
