// ** MUI Imports
import Grid from '@mui/material/Grid'
import CandleChart from 'src/views/pages/home/CandleChart'
import CoinsGrid from 'src/views/pages/home/CoinsGrid'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CoinsGrid />
      </Grid>
      <Grid item xs={12}>
        <CandleChart />
      </Grid>
    </Grid>
  )
}

export default Home
