type Channel = {
  id: number
  title: string
  username: any
  profilePhoto: string
}

type TelegramChannelListStateType = {
  channelsList: Channel[]
  selectedChannel: Channel | null
}

type Message = {
  id: number
  messageId: number
  message: string
}

type MessagePickerStateType = {
  messagesList: Message[]
  selectedMessage: Message | null
}

type SelectedText = {
  selectedText: string
  startIndex: number
  line: string
}

type algorithmKeysType =
  | 'Symbol'
  | 'Market'
  | 'Position'
  | 'Leverage'
  | 'Entry Targets'
  | 'Take-Profit Targets'
  | 'StopLoss'

type purchaseVolumeType = { title: string; volume: number; isPercentage: boolean }

type algorithmName = { title: string; value: string }

type AlgorithmType = {
  id: string
  selectedText: SelectedText | null
  algorithmicText: string | null
  usedAlgorithmKeys: algorithmKeysType[]
  purchaseVolume: purchaseVolumeType
  algorithmName: algorithmName
}

type AlgorithmListStateType = {
  algorithmsList: AlgorithmType[]
  selectedAlgorithm: AlgorithmType
}

type AlgorithmComposerStateType = AlgorithmType

type Exchange = {
  id: string
  name: string
  image: string
}

type UserExchanges = {
  exchangeId: string
  apiKey: string
  apiSecret: string
}

type ExchangeLinkerStateType = {
  exchangesList: Exchange[]
  selectedExchange: Exchange | null
  userExchanges: UserExchanges[]
}

type Wizard = {
  stepsList: UseTradingAlgorithmWizardStoreStep[]
  step: UseTradingAlgorithmWizardStoreStep
  TelegramChannelListState: TelegramChannelListStateType
  MessagePickerState: MessagePickerStateType
  AlgorithmListState: AlgorithmListStateType
  AlgorithmComposerState: AlgorithmComposerStateType
  ExchangeLinkerState: ExchangeLinkerStateType
  AlgorithmTesterState: any
}

type UseTradingAlgorithmWizardStoreStep =
  | 'ChannelsList'
  | 'MessagePicker'
  | 'AlgorithmsList'
  | 'AlgorithmComposer'
  | 'ExchangeLinker'
  | 'AlgorithmTester'
  | 'AlgorithmSaver'
