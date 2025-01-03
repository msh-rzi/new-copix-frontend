import { create } from 'zustand'

export const algorithmKeys: algorithmKeysType[] = [
  'Symbol',
  'Market',
  'Position',
  'Leverage',
  'Entry Targets',
  'Take-Profit Targets',
  'StopLoss'
]

// const obj = {
//   Symbol: '',
//   Market: '',
//   Position: '',
//   Leverage: '',
//   EntryTargets: [],
//   TakeProfitTargets: [],
//   StopLoss: ''
// }

// ***** Initial values
export const initialPurchaseVolume = { title: 'Purchase Volume ( $ Or % )', volume: 5, isPercentage: false }

export const initialAlgorithmName = { title: 'Algorithm name', value: '' }

const initialTelegramChannelListState: TelegramChannelListStateType = {
  channelsList: [],
  selectedChannel: null
}

const initialMessagePickerState: MessagePickerStateType = {
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

const initialAlgorithmListState: AlgorithmListStateType = {
  algorithmsList: [],
  selectedAlgorithm: initialAlgorithm
}

const initialAlgorithmComposerState: AlgorithmComposerStateType = initialAlgorithm

const initialExchangeLinkerState: ExchangeLinkerStateType = {
  exchangesList: [],
  selectedExchange: null,
  userExchanges: []
}

/// ***** Slice Data

const steps: UseTradingAlgorithmWizardStoreStep[] = [
  'ChannelsList',
  'MessagePicker',
  'AlgorithmsList',
  'AlgorithmComposer',
  'ExchangeLinker',
  'AlgorithmTester',
  'AlgorithmSaver'
]

type WizardState = {
  wizardData: Wizard
  setStep: (step: UseTradingAlgorithmWizardStoreStep) => void
  resetWizardData: () => void
  setTelegramChannelListState: (data: Partial<TelegramChannelListStateType>) => void
  setMessagePickerState: (data: Partial<MessagePickerStateType>) => void
  setAlgorithmListState: (data: Partial<AlgorithmListStateType>) => void
  setAlgorithmComposerState: (data: Partial<AlgorithmComposerStateType>) => void
  setExchangeLinkerState: (data: Partial<ExchangeLinkerStateType>) => void
}

export const initialWizardData: Wizard = {
  stepsList: steps,
  step: 'ChannelsList',
  TelegramChannelListState: initialTelegramChannelListState,
  MessagePickerState: initialMessagePickerState,
  AlgorithmListState: initialAlgorithmListState,
  AlgorithmComposerState: initialAlgorithmComposerState,
  ExchangeLinkerState: initialExchangeLinkerState,
  AlgorithmTesterState: {}
}

const useTradingAlgorithmWizardStore = create<WizardState>((set, get) => ({
  wizardData: initialWizardData,
  setStep: step => set({ wizardData: { ...get().wizardData, step } }),
  resetWizardData: () => set({ wizardData: initialWizardData }),
  setTelegramChannelListState: data =>
    set({
      wizardData: {
        ...get().wizardData,
        TelegramChannelListState: { ...get().wizardData.TelegramChannelListState, ...data }
      }
    }),
  setMessagePickerState: data =>
    set({
      wizardData: { ...get().wizardData, MessagePickerState: { ...get().wizardData.MessagePickerState, ...data } }
    }),
  setAlgorithmListState: data =>
    set({
      wizardData: { ...get().wizardData, AlgorithmListState: { ...get().wizardData.AlgorithmListState, ...data } }
    }),
  setAlgorithmComposerState: data =>
    set({
      wizardData: {
        ...get().wizardData,
        AlgorithmComposerState: { ...get().wizardData.AlgorithmComposerState, ...data }
      }
    }),
  setExchangeLinkerState: data =>
    set({
      wizardData: { ...get().wizardData, ExchangeLinkerState: { ...get().wizardData.ExchangeLinkerState, ...data } }
    })
}))

export default useTradingAlgorithmWizardStore
