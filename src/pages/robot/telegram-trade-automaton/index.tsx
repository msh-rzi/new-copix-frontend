import React, { useState } from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'

// ** Import Custom Components
import InformationBarCard from 'src/views/pages/telegram-trade-automaton/InformationBar'
import TradingAlgorithmWizardCard from 'src/views/pages/telegram-trade-automaton/TradingAlgorithmWizard'
import TelegramConnectionDialog from 'src/views/pages/telegram-trade-automaton/TelegramConnectionDialog'

const TelegramTradeAutomaton = () => {
  const [loading, setLoading] = useState(false)
  const [isConnectedToTelegram, setIsConnectedToTelegram] = useState(true)

  return (
    <React.Fragment>
      <TelegramConnectionDialog
        loading={loading}
        setLoading={setLoading}
        setIsConnectedToTelegram={setIsConnectedToTelegram}
      />
      {!loading && (
        <Grid container spacing={6} sx={{ height: 'calc(100% - 2rem)' }}>
          <Grid item xs={12}>
            <InformationBarCard />
          </Grid>
          <Grid item xs={12} sx={{ height: '100%' }}>
            <TradingAlgorithmWizardCard disableView={isConnectedToTelegram} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default TelegramTradeAutomaton
