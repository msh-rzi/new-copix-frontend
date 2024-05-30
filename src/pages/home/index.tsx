// ** MUI Imports
import Grid from '@mui/material/Grid'
import BybitBalance from 'src/views/pages/home/bybit-balance'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BybitBalance />
      </Grid>
    </Grid>
  )
}

export default Home
