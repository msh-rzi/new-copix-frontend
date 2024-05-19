import React, { useState } from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// ** Import Custom Components
import InformationBarCard from 'src/views/pages/telegram-trade-automaton/InformationBar'
import TradingAlgorithmWizardCard from 'src/views/pages/telegram-trade-automaton/TradingAlgorithmWizard'
import TelegramConnectionDialog from 'src/views/pages/telegram-trade-automaton/TelegramConnectionDialog'

const TelegramTradeAutomaton = () => {
  const [loading, setLoading] = useState(true)
  const [isConnectedToTelegram, setIsConnectedToTelegram] = useState(true)

  return (
    <React.Fragment>
      <TelegramConnectionDialog
        setLoading={setLoading}
        setIsConnectedToTelegram={setIsConnectedToTelegram}
        loading={loading}
      />
      <Grid container spacing={6} sx={{ height: 'calc(100% - 2rem)' }}>
        {!loading ? (
          <>
            <Grid item xs={12}>
              <InformationBarCard />
            </Grid>
            <Grid item xs={12} sx={{ height: '100%' }}>
              <TradingAlgorithmWizardCard disableView={isConnectedToTelegram} />
            </Grid>
          </>
        ) : (
          <Grid
            item
            sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CircularProgress sx={{ margin: 'auto' }} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default TelegramTradeAutomaton
